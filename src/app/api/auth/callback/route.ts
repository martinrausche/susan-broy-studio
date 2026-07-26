import { NextRequest, NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${request.nextUrl.origin}/api/auth/callback`;

  if (error) {
    console.error("Google OAuth error received:", error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, baseUrl));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", baseUrl));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const jwtSecret = process.env.JWT_SECRET;
  
  const allowedEmailsStr = process.env.ALLOWED_EMAILS || "";
  const allowedEmails = allowedEmailsStr
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!clientId || !clientSecret || !jwtSecret) {
    console.error("Missing authentication configuration in environment variables.");
    return NextResponse.redirect(new URL("/login?error=server_configuration_error", baseUrl));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok || !tokens.access_token) {
      console.error("Failed to exchange code for tokens:", tokens);
      return NextResponse.redirect(new URL("/login?error=token_exchange_failed", baseUrl));
    }

    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userInfo = await userInfoResponse.json();

    if (!userInfoResponse.ok || !userInfo.email) {
      console.error("Failed to fetch Google profile:", userInfo);
      return NextResponse.redirect(new URL("/login?error=profile_fetch_failed", baseUrl));
    }

    const email = userInfo.email.toLowerCase();

    if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
      console.warn(`Unauthorized login attempt for: ${email}`);
      return NextResponse.redirect(new URL("/login?error=unauthorized_user", baseUrl));
    }

    const sessionToken = signJWT(
      {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      },
      jwtSecret
    );

    const response = NextResponse.redirect(new URL("/", baseUrl));
    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("Authentication callback exception:", err);
    return NextResponse.redirect(new URL("/login?error=auth_internal_exception", baseUrl));
  }
}
