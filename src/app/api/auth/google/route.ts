import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  // Determine protocol and host accurately behind Vercel edge proxy
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host;
  
  // Preferred redirectUri from env if explicitly set, otherwise exact current domain
  const redirectUri = 
    process.env.GOOGLE_REDIRECT_URI || 
    `${proto}://${host}/api/auth/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "GOOGLE_CLIENT_ID is missing in environment variables." },
      { status: 500 }
    );
  }

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.append("client_id", clientId);
  googleAuthUrl.searchParams.append("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.append("response_type", "code");
  googleAuthUrl.searchParams.append("scope", "openid email profile");
  googleAuthUrl.searchParams.append("access_type", "online");
  googleAuthUrl.searchParams.append("prompt", "select_account");

  return NextResponse.redirect(googleAuthUrl.toString());
}
