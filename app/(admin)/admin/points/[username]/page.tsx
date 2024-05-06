"use client";

import PointList from "@/components/PointList";
import { PointHistory } from "@/model/pointHistory";
import useSWR from "swr";

interface Context {
  params: {
    username: string;
  };
}

export default function Page({ params }: Context) {
  const username = params.username;

  const { data: pointHistory, mutate: mutatePointHistory } = useSWR(`/search/${username}`);

  return (
    <div className="p-12 flex flex-col items-center">
      <div className="text-2xl font-bold">
        <p>
          <span className="text-blue-500">{username}</span>
          님의 포인트
        </p>
      </div>
      <PointList pointHistory={pointHistory} />
    </div>
  );
}
