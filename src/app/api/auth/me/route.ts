import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!sessionToken || !jwtSecret) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = verifyJWT(sessionToken, jwtSecret);

  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    },
  });
}
