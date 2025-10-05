function climbStairs(n: number): number {
  // 一段目だけの時は早期リターン
  if (n <= 2) return n;

  let ways: number = 0;
  let prev = 1;
  let next = 2;
  for (let i = 3; i <= n; i++) {
    ways = prev + next;
    prev = next;
    next = ways;
  }

  return ways;
}
