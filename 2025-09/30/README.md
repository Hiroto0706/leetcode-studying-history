> Example 1:
>
> Input: s = "Hello World"
> Output: 5
> Explanation: The last word is "World" with length 5.
>
> Example 2:
>
> Input: s = " fly me to the moon "
> Output: 4
> Explanation: The last word is "moon" with length 4.
>
> Example 3:
>
> Input: s = "luffy is still joyboy"
> Output: 6
> Explanation: The last word is "joyboy" with length 6.

上記のように、Input の文字列の最後の文字の長さを答えるというもの。
ただの文字列なので、空白は trim する必要がある。

初めは、以下のように Set 使えば、重複削除できて簡単にできるんじゃね？って思ったけど、最後の文字がすでに出ている場合、Set によって重複削除されてしまい、テストケースを満たさないことが分かった。

```ts
function lengthOfLastWord(s: string): number {
  const sArrSet = new Set(s.split(" "));
  const sArr = [...sArrSet].filter((x) => x !== "");
  return sArr[sArr.length - 1].length;
}
```

以下のようによりシンプルな実装にすることでテストケースを満たすだけでなく、速度もメモリ効率も良い結果を出すことができた。

```ts
function lengthOfLastWord(s: string): number {
  const sArr = s.split(" ").filter((x) => x !== "");
  return sArr[sArr.length - 1].length;
}
```
