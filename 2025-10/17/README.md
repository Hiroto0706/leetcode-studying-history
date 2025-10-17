## https://leetcode.com/problems/zigzag-conversion/submissions/1804225987

> Example 1:<br>
> Input: s = "PAYPALISHIRING", numRows = 3<br>
> Output: "PAHNAPLSIIGYIR"<br><br>
> Example 2:<br>
> Input: s = "PAYPALISHIRING", numRows = 4<br>
> Output: "PINALSIGYAHRPI"<br>
> Explanation:<br>
> P I N
> A L S I G
> Y A H R
> P I<br><br>
> Example 3:<br>
> Input: s = "A", numRows = 1<br>
> Output: "A"<br>

与えられた文字列をジグザク文字にして、下から数えた値を出力するというもの。

```ts
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
```

ChatGPT にヒントをもらいながらコードを書いた。

まず、ジグザク文字は一周期が cycle = 2(R-1)になるので、それをベースに考えていった。

一文字ずつループをしていき、以下の部分で現在の文字がどの行に属するものかを判別している。
```ts
const t = k % cycle;
const row = t < numRows ? t : cycle - t;
```

まず、k%cycleで1サイクルにおける何番目かを判別する。
その後、t < numRows?t:cycle-tで、詳細な行番号を求める。

それをresにpushすれば各行における文字を格納することができるようになるのだ。

そして、最後に各行をjoinし、全体をjoinすれば求めていた結果を得ることができるようになる。
