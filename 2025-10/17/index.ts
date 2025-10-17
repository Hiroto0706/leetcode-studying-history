function convert(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s;

  const res: string[][] = Array.from({ length: numRows }, () => [] as string[]);
  const cycle = 2 * (numRows - 1);

  for (let k = 0; k < s.length; k++) {
    const t = k % cycle;
    const row = t < numRows ? t : cycle - t;
    res[row].push(s[k]);
  }

  return res.map((row) => row.join("")).join("");
}
