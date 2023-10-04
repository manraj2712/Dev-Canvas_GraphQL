import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET!;
  const token = await getToken({ req, secret, raw: true });
  if (token) {
    return NextResponse.json({ token }, { status: 200 });
  }

  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
}
