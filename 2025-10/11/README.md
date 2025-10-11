## https://leetcode.com/problems/same-tree/submissions/1797840168

> Example 1:
>
> Input: p = [1,2,3], q = [1,2,3]
> Output: true
>
> Example 2:
>
> Input: p = [1,2], q = [1,null,2]
> Output: false
>
> Example 3:
>
> Input: p = [1,2,1], q = [1,1,2]
> Output: false

この問題は与えられた Tree 構造の Node が完全に一致するかどうかを確かめると言うもの。

これもまたちょっと難しく、ChatGPT に聞かないとわからなかった…

回答としてはこんな感じになる。
重要なのは TreeNode のペアを格納する stack という変数になる。

まず、root のなかに p,q のペアをスタックする。
スタックには比較すべき Node が格納されており、stack.length が 0 以下になった時、つまり比較すべき Node がなくなった時にループが抜ける。

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;

  const stack: Array<[TreeNode | null, TreeNode | null]> = [];
  stack.push([p, q]);

  while (stack.length > 0) {
    const pair = stack.pop();
    if (!pair) continue;

    const [a, b] = pair;
    if (!a && !b) continue;
    if (!a || !b) return false;
    if (a?.val !== b?.val) return false;

    stack.push([a.left, b.left]);
    stack.push([a.right, b.right]);
  }

  return true;
}
```

ループ処理にて重要なのは、以下の部分だと思っている。

```ts
const [a, b] = pair;
if (!a && !b) continue;
if (!a || !b) return false;
if (a?.val !== b?.val) return false;
```

先に a と b がどちらも null の場合を比較する。この場合は完全に一致しているかどうか判断できないので continue にする。

もしどちらも値がある場合、片方が null じゃないかを確かめる。
前の処理でどちらも null 出ないことが確認できたので、どちらか片方が null だった場合、この条件文は true となる。
つまり、片方は null ということで不一致になる。
最後に値の比較を行い、不一致なら false を返す。

ここがすべて true なら値があるといえるし、完全に一致していると言えるので、left と right の Node を stack に追加し、ループを回す

これを繰り返すのがこの処理の肝である。

<details>
<summary>フィードバック</summary>

</details>
