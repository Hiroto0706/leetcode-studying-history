## https://leetcode.com/problems/add-two-numbers/submissions/1797366442

> Example 1:
> Input: l1 = [2,4,3], l2 = [5,6,4]
> Output: [7,0,8]
> Explanation: 342 + 465 = 807.
>
> Example 2:
> Input: l1 = [0], l2 = [0]
> Output: [0]
>
> Example 3:
> Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
> Output: [8,9,9,9,0,0,0,1]

今回は初めて Easy でない問題を解いた。
内容としては、繰り上がり足し算を行うというもの。

正直 ChatGPT がないと厳しかった…

まず、dummy と tail についてだが、dummy は最終的なレスポンスのための変数。
tail は再起的な処理を進めるにあたって、dummy を直接編集してしまうと最終 response の際に、更新された内容を送ることになるので、作業テーブルとして tail を作っているという感じ。

ここで重要なのは carry の概念かなと思っている。
carry は値同士の足し算を行った際の繰り上がりを表現している。
この carry に足し算のくり上がりの方の値を代入することで、足し算の結果を問題なく次の値に繋げることができるのだ。

そのほか、tail.next では足し算の結果の一の位を代入していることがわかる。
9 + 5 をした時に 14 となると思うのだが、carry には 1 が代入され、tail.next には 4 が足されるという感じ。

```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}
```
