## https://leetcode.com/problems/climbing-stairs/submissions/1791808787

> Example 1:
>
> Input: n = 2
> Output: 2
> Explanation: There are two ways to climb to the top.
>
> 1.  1 step + 1 step
> 2.  2 steps
>
> Example 2:
> Input: n = 3
> Output: 3
> Explanation: There are three ways to climb to the top.
>
> 1.  1 step + 1 step + 1 step
> 2.  1 step + 2 steps
> 3.  2 steps + 1 step

この問題は階段 n 段登るために必要な選択肢の数を当てるというもの。この階段の選択肢の数は、フィボナッチ数列に従っていることがわかる。

例えば、一段目の時は 1 しかないので 1 通り。
二段目の時は 1+1 と 2 の 2 通り。
三段目の時は 1+1+1, 1+2, 2+1 の 3 通りとなっている。
そして、四段目は 1+1+1+1, 1+1+2, 2+1+1, 1+2+1, 2+2no
5 通りとなっている。

改めて整理すると、三段目は一段目の合計+二段目の合計であり、四段目は三段目の合計+二段目の合計となっている。

これは前二つの数字の合計が答えとなるフィボナッチ数列に従っていることがわかる。

これをコードに落とし込むと以下のようになる。

```ts
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
```

このコードはランタイムこそ早かったが、メモリ効率が悪かった。

以下のように配列を用いて計算すると、少し速くなった。
ちなみに配列を使うことで JS の V8 エンジンがメモリアクセスを最適化しているからこのような差が出たと思われる。

```ts
function climbStairs(n: number): number {
  const tab: number[] = new Array(n + 1).fill(0);
  if (n >= 0) tab[0] = 1;
  if (n >= 1) tab[1] = 1;
  for (let i = 2; i <= n; i++) tab[i] = tab[i - 1] + tab[i - 2];
  return tab[n];
}
```
