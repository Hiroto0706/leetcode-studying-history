## https://leetcode.com/problems/sqrtx/submissions/1789829802

> Example 1:
> Input: x = 4
> Output: 2
> Explanation: The square root of 4 is 2, so we return 2.
>
> Example 2:
> Input: x = 8
> Output: 2
> Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

この問題は与えられた数字の平方根を答えるというもの。
例えば、4 の平方根は 2 なので答えは 2、8 の場合は 2.8 とかでその一の位である２を返すってのがこの問題。

この問題において pow とか\*\*を使うのは禁止されており、
それ以外の方法で平方根を答える必要がある。

自分は以下のように回答。
これは i の二乗と i+1 の二乗の間に今回の値が存在するかをチェックするというもの。存在しない場合は、i+1 して再度 for を回す。
これを繰り返す。

```ts
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
```

実際、メモリ効率はかなり良いほうだったのだが、ランタイムがかなり遅かった。
その原因は 2 分探査を使わなかったから。2 分探査を使うことでこれ以上に効率的に値の調査をすることができ、非常に効率的。

馬鹿正直に+1 していくのではなく、二分探査を使ってさらに効率的に探索をするということを覚えておこう。

```ts
function mySqrt(x: number): number {
  let left: number = 1;
  let right: number = x;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);

    if (mid * mid === x) {
      return mid;
    } else if (mid * mid < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}
```
