## https://leetcode.com/problems/longest-palindromic-substring/submissions/1800873773

> Example 1:<br>
> Input: s = "babad"
> Output: "bab"
> Explanation: "aba" is also a valid answer.<br><br>
> Example 2:<br>
> Input: s = "cbbd"
> Output: "bb"

最も長い回文を見つけるプログラムを書くという問題。

自分の回答としては、以下の通りとなった。
今回もヒントをもらわないとわからなかった。
回文を見つけるためには、中心となる文字列を見つけそこから left と right にそれぞれ 1 つずつ見ていき内容が一致していたら OK という感じで進めていくのがいいのかということを今回の問題で学ぶことができた。

```ts
function longestPalindrome(s: string): string {
  const expand = (left: number, right: number): string => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }
    return s.slice(left + 1, right);
  };

  let result = "";
  for (let i = 0; i < s.length; i++) {
    const sub1 = expand(i, i);
    if (sub1.length > result.length) result = sub1;

    const sub2 = expand(i, i + 1);
    if (sub2.length > result.length) result = sub2;
  }
  return result;
}
```

また、回文は長さが偶数の場合真ん中が隙間のパターンが存在する。
そういったときには`expand(i, i+1)`のように+1 することで対応することができるのだということも学ぶことができた。

今回の問題は以下のYoutubeの解説がなければ解くことができなかったと思う。

https://youtu.be/E-tmN1OM9aA
