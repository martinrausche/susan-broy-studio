import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  const canonicalDomain = "https://susan-broy-studio.vercel.app";
  
  // Use env redirect_uri if set, otherwise default to canonical Vercel production domain
  const redirectUri = 
    process.env.GOOGLE_REDIRECT_URI || 
    (process.env.NODE_ENV === "production"
      ? `${canonicalDomain}/api/auth/callback`
      : `${request.nextUrl.origin}/api/auth/callback`);

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
