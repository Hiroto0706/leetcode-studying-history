function lengthOfLastWord(s: string): number {
  const sArr = s.split(" ").filter(x => x !== "");
  return sArr[sArr.length - 1].length;
};