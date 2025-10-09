## https://leetcode.com/problems/binary-tree-inorder-traversal/submissions/1796446847

> Example 1:
>
> Input: root = [1,null,2,3]
> Output: [1,3,2]
>
> Example 2:
> Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
> Output: [4,2,6,5,7,1,3,9,8]
>
> Example 3:
> Input: root = []
> Output: []
>
> Example 4:
> Input: root = [1]
> Output: [1]

今回は上記のような木構造のデータを左から順に出力するというタスクとなっている。

正直めっちゃ難しかったし、ChatGPT に聞かないとわからなかった…

自分は最終的に以下のようなコードを書いた。
ランタイムは 100%を達成することができた。

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    result.push(curr.val);

    curr = curr.right;
  }

  return result;
}
```

やっていることとしては以下の通り。
[1, null, 2, 3]を参考に説明します。

まず、curr に root を代入します。（curr = [1,null,3,2]）
while 文は curr が null または stack.length が 0 より大きい場合二回り続けるようになっています。

2 階走目の while で stack に node を push しつつ、一番左にある Node まで探索します。
今回の例の場合だと、1 の Node の left には何もないので、val が 1 の Node が stack に代入されるだけでループを抜けます。

その後、stack より Node を pop し、result に push します。
この処理では一番左にある Node を result に push するってことを行なっています。

その次に curr.right を curr に代入し、次に行きます。
val が 1 の Node の右には[2,3]があります。
続いて、2 の Node の一番左まで進みます。２の Node の左には 3 の Node があるのでそれを curr に設定しつつ、2 の Node を stack に push します。

３の Node が一番左なので result に push します。
3 の Node の right は存在しないので、次のループの時には 2 階走目の while は素通りし、curr から 2 の Node を pop し、それを result に push します。

そして、curr も null になったし、stack も 0 になったので、while を抜け result を返すという流れです。

むずすぎるわ！！！
