## https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/1798953646

> Example 1:<br>
> Input: s = "abcabcbb"
> Output: 3
> Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
>
> Example 2:<br>
> Input: s = "bbbbb"
> Output: 1
> Explanation: The answer is "b", with the length of 1.
>
> Example 3:<br>
> Input: s = "pwwkew"
> Output: 3
> Explanation: The answer is "wke", with the length of 3.
> Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

これは与えられた文字列から重複しない連続する文字列の最大値を求めるというもの。

abcabcddd という値が与えられたら、a,b,c,d が連続する値の中で最長なので 4 を返すみたいなのがこの処理で行うべきことになる。

回答としては以下のような実装を行った。
しかし、この内容あまりよくなくメモリ効率もそこまでよくないし、実行スピードもあまり高くなかった。

原因は while のなかで while をしており、さらに index を+1 するだけになっているので、非効率な部分が多かったからかなと思う。

```ts
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
```

対策としては、重複が発生した時にどの index で重複が発生したかを発見するようなロジックを追加すれば、もう少し効率よくできたのかなと思った。（とはいえその発見ロジックもちょっと複雑にはなりそうだが）

他の人の回答を見ると、以下の実装がかなり早かった。
これやっていることとしては、indexOf で特定の文字の index を取得し、存在していなかったら scanner に追加するという処理を行なっている（破壊的な処理なので前の文字列は消える）

splice で既存のやつは削除しているので値の更新も問題なし。
そして、どんどん値を push していき、最終的に const char of s が切れたら終了っていう感じか。

```ts
function lengthOfLongestSubstring(s: string): number {
  const scanner: string[] = [];
  let longest = 0;

  for (const char of s) {
    const possibleIndex = scanner.indexOf(char);

    if (possibleIndex !== -1) {
      scanner.splice(0, possibleIndex + 1);
    }
    scanner.push(char);
    longest = Math.max(longest, scanner.length);
  }

  return longest;
}
```

これ自分の書いたコードと違って美しいのが、自然に途中の index から追加処理を開始しているというところ。

ループ処理の中でループ処理を読んでいないので、O(n)で完了しているところ？
自分のは O(n^2)になっていた？

<details>
<summary>フィードバック</summary>
結論：

- 最初の実装は **O(n²)**（`arr.includes` が毎回 O(現在長) で、開始位置を 1 ずつしか進めない）→ 遅くなりがち。
- 紹介してくれた **`indexOf + splice`** 版は見た目きれいだけど、**厳密には O(n²)** です。

  - `scanner.indexOf(char)` が O(窓長)
  - `splice(0, k)` もシフトが発生して O(窓長)
    → 文字列全体で二乗級に膨らむ最悪ケースがある（例：ほぼすべてユニークや、同じ文字が一定周期で出るケース）。

本当に **O(n)** にしたいなら「スライディングウィンドウ + 直近位置マップ」が王道です。

### なぜ O(n) になるのか（発想）

- 右端 `right` を 0→n-1 で一度ずつ動かす
- 文字 `ch = s[right]` が前に出ていれば、左端 `left` を **その直近出現の「次」** まで一気にジャンプ（`left` は決して後退しない）
- 直近位置は `Map<char, nextIndex>` に保持（`nextIndex = index + 1` にしておくと計算が楽）
  → 各文字は **入る/出る** を高々 1 回ずつ処理するだけなのでトータル O(n)

### 直感比較

- `indexOf + splice`：毎回「探す」「先頭から k 個消す」でコストがかかる
- `Map` 方式：探すのは `Map.get(ch)`（平均 O(1)）、左端は数値ジャンプだけで済む

### 参考実装（説明用）

```ts
function lengthOfLongestSubstring(s: string): number {
  let left = 0,
    maxLen = 0;
  const last = new Map<string, number>(); // char -> 直近出現の「次の位置」

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch)) {
      // 左端を後退させないことが重要
      left = Math.max(left, last.get(ch)!);
    }
    maxLen = Math.max(maxLen, right - left + 1);
    last.set(ch, right + 1);
  }
  return maxLen;
}
```

### まとめ

- あなたの分析「自作は O(n²)、後者は O(n) ？」→ **後者も最悪 O(n²)**。
- **真の O(n)** は「`Map` で直近位置管理」＋「`left` をジャンプ」のスライディングウィンドウ。
- メモリは **O(アルファベット種数)**（英数字・記号でも高々数百）で十分小さいです。

この観点を押さえれば、他の重複なし／窓問題にもそのまま応用できますよ！

</details>
