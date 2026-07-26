import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = NextResponse.redirect(new URL("/login", baseUrl));
  
  response.cookies.set("session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}
