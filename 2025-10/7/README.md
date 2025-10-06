## https://leetcode.com/problems/merge-sorted-array/submissions/1793602812

この問題では、

> Example 1:
>
> Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
> Output: [1,2,2,3,5,6]
> Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
> The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
>
> Example 2:
>
> Input: nums1 = [1], m = 1, nums2 = [], n = 0
> Output: [1]
> Explanation: The arrays we are merging are [1] and [].
> The result of the merge is [1].
>
> Example 3:
>
> Input: nums1 = [0], m = 0, nums2 = [1], n = 1
> Output: [1]
> Explanation: The arrays we are merging are [] and [1].
> The result of the merge is [1].
> Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

このように配列から関係ない値を削除するという問題となっている。

以下のように、tmp という変数を用いて修正結果を保持し、最終的にそれを nums1 に push することで解決した。

```ts
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  if (nums2.length === 0) return;
  if (nums1.length === 0) {
    nums1.push(...nums2);
    return;
  }

  const nums2Len = nums2.length;
  const nums1Len = nums1.length - nums2Len;
  nums1.length = nums1Len;

  const tmp: number[] = nums1.concat(nums2).sort((a, b) => a - b);
  nums1.length = 0;
  nums1.push(...tmp);

  return;
}
```

nums1.length = 0 はちょっとだけズルい気もするが、とはいえこれで runtime は 0ms の beats100%を達成することができた。

その他の手法を見た感じ、以下のようなシンプルな方法があった。
確かにこの方法だと nums1 の後ろに nums2 を追加することができ、それを最終的に sort することで、並び替えも問題なく実行している。

賢い方法だなと思った。

```ts
// TypeScript

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  for (let j = 0, i = m; j < n; j++, i++) {
    nums1[i] = nums2[j];
  }
  nums1.sort((a, b) => a - b);
}
```
