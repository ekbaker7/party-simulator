import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(
  token: string
): Promise<{ verified: boolean; error: any }> {
  try {
    await jose.jwtVerify(token, secret);
    return { verified: true, error: null };
  } catch (error) {
    return { verified: false, error };
  }
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const parsedToken = await verifyToken(token);

  if (!parsedToken.verified || parsedToken.error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me", "/api"],
};
