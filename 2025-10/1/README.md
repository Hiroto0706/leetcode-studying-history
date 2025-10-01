# https://leetcode.com/problems/plus-one/submissions/1788323970

今回の問題は以下のように配列で与えられた数字に対して、+1 した結果を配列で返すという問題。

## Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].

## Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

## Example 3:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

キーとなるのは、桁が上がるような時にどうするかっていうところ。

今回は以下のコードを書くことで、かなりメモリ効率とスピードの良い結果を得ることができた。

```ts
function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}
```

これは、digits の値を後ろから順に見ていき、その値が 9 以下の時は問題なく+1 してもよいので、+1 した後に値を返している。

例） 1, 2 のとき 2 + 1 = 3 なので問題無し

else の場合は一旦 digits[i] = 0 として、次の値のチェックを行なっている。
これを順に繰り返しき、for を抜ける、つまり全ての値が 9 だった時、先頭に 1 を追加すれば良いので、先頭に 1 を追加し、処理を終えている。

例） 9,9,9 のとき+1 すると 1000 になる

ちなみに、一度以下のような内容で提出したのだが、間違いになった。

```ts
function plusOne(digits: number[]): number[] {
  let d = digits.reduce((acc, d) => acc * 10 + d, 0);
  return String(d + 1)
    .split("")
    .map(Number);
}
```

これがダメだった理由は、JS の Number 型の限界に達しているからになる。
JS の Number は IEEE754 の倍精度浮動小数のため、9 兆までの数字しか安全に扱えない。

以下のようにデカすぎる数字は安全に計算できないため、結果として丸め誤差が起きてキャンセルとなった。

```
[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]
```
