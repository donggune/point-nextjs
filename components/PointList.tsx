import { formatDate } from "@/lib/util";
import { PointHistory } from "@/model/pointHistory";

interface Props {
  pointHistory: PointHistory[];
}

export default function PointList({ pointHistory }: Props) {
  return (
    <div className="mt-10">
      {pointHistory.length === 0 ? (
        <div className="text-center">
          <p>포인트 내역이 없습니다</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <p>[사용가능 포인트]</p>
          <span className="font-bold text-blue-500 bg-blue-100 p-2 rounded-md mt-3">
            {pointHistory.reduce(
              (acc, item) => acc + (item.transactionType === "deposit" ? item.points : -item.points),
              0
            )}
          </span>
        </div>
      )}
      <ul className="mt-5">
        {pointHistory.map((item: PointHistory) => (
          <li key={item.createdAt} className="flex justify-center gap-3">
            <div>
              <span>{formatDate(item.createdAt)}</span>
            </div>
            <div>
              <span>{item.points}</span>
              <span>{item.transactionType === "deposit" ? "+" : "-"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
