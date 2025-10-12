function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;
  let max = 0;
  let i = 0;
  while (i < s.length) {
    const arr: string[] = [];
    let j = i;
    while (s[j] && !arr.includes(s[j])) {
      arr.push(s[j]);
      j++;
    }
    if (max < arr.length) {
      max = arr.length;
    }
    i++;
  }

  return max;
}
