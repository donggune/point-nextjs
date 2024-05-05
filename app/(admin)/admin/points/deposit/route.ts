import { depositPoint } from "@/service/point";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { point, username } = await req.json();
  const res = await depositPoint(username, point);
  return NextResponse.json(res);
}
