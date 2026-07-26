import { NextRequest, NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";

function normalizeEmail(email: string): string {
  const clean = email.trim().toLowerCase();
  const [local, domain] = clean.split('@');
  if (!domain) return clean;

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const localWithoutDots = local.replace(/\./g, '');
    return `${localWithoutDots}@gmail.com`;
  }
  return clean;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host;
  
  const currentOrigin = `${proto}://${host}`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || currentOrigin;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "https://susan-broy-studio.vercel.app/api/auth/callback";

  if (error) {
    console.error("Google OAuth error received:", error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, baseUrl));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", baseUrl));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const jwtSecret = process.env.JWT_SECRET || "fallback_broy_jwt_secret_2026";
  
  const allowedEmailsStr = process.env.ALLOWED_EMAILS || "";
  const allowedEmailsRaw = allowedEmailsStr
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const allowedEmailsNormalized = allowedEmailsRaw.map(normalizeEmail);

  if (!clientId || !clientSecret) {
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

    const userEmailRaw = userInfo.email;
    const userEmailNormalized = normalizeEmail(userEmailRaw);

    if (allowedEmailsNormalized.length > 0) {
      const isAuthorized = allowedEmailsNormalized.some(allowed => 
        allowed === userEmailNormalized || 
        userEmailRaw.toLowerCase() === allowed ||
        allowed.includes(userEmailNormalized) ||
        userEmailNormalized.includes(allowed)
      );

      if (!isAuthorized) {
        console.warn(`Unauthorized login attempt for: ${userEmailRaw} (Normalized: ${userEmailNormalized})`);
        return NextResponse.redirect(new URL("/login?error=unauthorized_user", baseUrl));
      }
    }

    const sessionToken = signJWT(
      {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      },
      jwtSecret
    );

    const targetUrl = new URL("/", currentOrigin);
    const response = NextResponse.redirect(targetUrl);
    
    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: true,
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
