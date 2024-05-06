import { client } from "./sanity";

export async function getAllMemberPoint() {
  return client.fetch(`*[_type == "user"] | order(availablePoints desc){
    username,
    availablePoints
  }`);
}

export function getPointHistory(keyword: string) {
  const query = `*[_type == "pointHistory" && user->username == "${keyword}"] | order(_createdAt desc){
    "user":user->username,
    points,
    transactionType,
    "createdAt": _createdAt
  }`;
  console.log("[ QUERY ]  ", query);

  return client.fetch(query);
}

export async function depositPoint(username: string, point: number) {
  const userQuery = `*[_type == "user" && username == "${username}"]{_id, availablePoints}`;

  let user = await client.fetch(userQuery).then((res) => res[0]);
  let userId = user?._id;
  let availablePoints = user?.availablePoints || 0;

  if (!userId) {
    console.log(`${username}  사용자를 찾을 수 없으므로 사용자를 생성합니다.`);
    const newUser = await client.create({
      _type: "user",
      username,
    });
    console.log(`${username}  사용자가 생성되었습니다.  생성된 사용자 ID: ${newUser._id}`);
    userId = newUser._id;
  }

  client
    .patch(userId)
    .set({
      availablePoints: availablePoints + point,
    })
    .commit();

  return client.create({
    _type: "pointHistory",
    user: { _ref: userId },
    points: point,
    transactionType: "deposit",
  });
}

export async function withdrawPoint(username: string, point: number) {
  const userQuery = `*[_type == "user" && username == "${username}"]{_id, availablePoints}`;

  const user = await client.fetch(userQuery).then((res) => res[0]);
  const userId = user?._id;
  const availablePoints = user?.availablePoints || 0;

  if (!userId) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  client
    .patch(userId)
    .set({
      availablePoints: availablePoints - point,
    })
    .commit();

  return client.create({
    _type: "pointHistory",
    user: { _ref: userId },
    points: point,
    transactionType: "withdraw",
  });
}
