import { userList } from "@/model/pointHistory";
import Link from "next/link";

interface Props {
  userList: userList[];
}

export default function AllPointList({ userList }: Props) {
  return (
    <div className="mt-10">
      <ul className="flex flex-col gap-3">
        {userList &&
          userList.map((item: userList) => (
            <li key={item.username} className="flex justify-center gap-3">
              <Link href={`/admin/points/${item.username}`}>
                <div className="bg-blue-500 p-3 rounded-xl">
                  <span>{item.username}</span>
                </div>
              </Link>
              <div className="p-3">
                <span>{item.availablePoints}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
