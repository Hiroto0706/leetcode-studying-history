## https://leetcode.com/problems/add-binary/submissions/1789255650

> Example 1:
>
> Input: a = "11", b = "1"
> Output: "100"
>
> Example 2:
>
> Input: a = "1010", b = "1011"
> Output: "10101"

上記のように string で与えられるバイナリデータを足し合わせて、その結果を文字列のバイナリデータで返すというもの

例えば、111, 100 という値が与えられていたら 10 進数で 7 + 4 = 11 となり、結果は 1011 になればよい

んで、実際に書いたコードはこちら

```ts
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
```

実は chatgpt にヒントをもらいながらやらないとわからなかった…
2 進数の扱いってどうすればいいかわからず、質問してようやく分かった。

今回の実装を通して、2 進数の実装では繰り上げを carry を使って表現し、2 進数の表現は%を使って実装するって感じのを理解した
