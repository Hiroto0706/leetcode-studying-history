function mySqrt(x: number): number {
  if (x === 1) return 1;

  let i = 0;
  while (i < x) {
    let s = i * i;
    let e = (i + 1) * (i + 1);

    if (s <= x && x < e) {
      return i;
    }
    i++;
  }
  return 0;
}
