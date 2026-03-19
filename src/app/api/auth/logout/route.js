import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("auth_session");
  return response;
}
