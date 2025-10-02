function addBinary(a: string, b: string): string {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result: string = "";
  while (i >= 0 || j >= 0) {
    let sum = carry;
    if (i >= 0) sum += Number(a[i]);
    if (j >= 0) sum += Number(b[j]);
    result = String(sum % 2) + result;
    carry = Math.floor(sum / 2);
    i--;
    j--;
  }

  if (carry) result = String(carry) + result;

  return result;
}
