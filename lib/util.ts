export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
