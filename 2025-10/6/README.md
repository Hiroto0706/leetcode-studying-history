## https://leetcode.com/problems/remove-duplicates-from-sorted-list/submissions/1793133956

> Example 1:
>
> Input: head = [1,1,2]
> Output: [1,2]
>
> Example 2:
>
> Input: head = [1,1,2,3,3]
> Output: [1,2,3]

上記のように階層構造になっている ListNode から重複しているデータを削除するというのがこの問題の目的。

最終的には以下のようなコードを提出し、クリアした。

```ts
//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let curr = head;

  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
}
```

少し難しかったところとして、再起的なノード処理である。
n 階層目の ListNode の値をどう参照すれば良いかで悩んでしまった。

curr という変数に head をコピーし、curr の中身を変更すれば、head に影響があるということさえ理解すれば解ける問題だった。
そう考えれば、curr に対しての変更は全て head にゆくので、curr から重複している値さえ削除してしまえばできる問題だった。
