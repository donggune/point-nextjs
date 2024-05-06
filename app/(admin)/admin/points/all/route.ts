import { getAllMemberPoint } from "@/service/point";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidatePath("/admin/points/all");

  return getAllMemberPoint().then((res) => {
    return NextResponse.json(res);
  });
}
