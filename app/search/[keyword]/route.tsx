import { getPointHistory } from "@/service/point";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: {
    keyword: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  revalidatePath(`/search/${context.params.keyword}`);
  const { keyword } = context.params;

  return getPointHistory(keyword) //
    .then((res) => {
      return NextResponse.json(res);
    });
}
