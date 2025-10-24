## https://leetcode.com/problems/balanced-binary-tree/submissions/1808378902

> Given a binary tree, determine if it is height-balanced.<br>
> Example 1:<br>
> Input: root = [3,9,20,null,null,15,7]<br>
> Output: true<br><br>
> Example 2:<br>
> Input: root = [1,2,2,3,3,null,null,4,4]<br>
> Output: false<br><br>
> Example 3:<br>
> Input: root = []<br>
> Output: true<br>

与えられたノードがバランスの取れたノードかどうかを判別するというもの。
バランスの良さは left と right のノードの深さが ±1 なら OK というもの。

```ts
function isBalanced(root: TreeNode | null): boolean {
  // 高さを返す。アンバランスを見つけたら -1 を返す。
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;

    const lh = height(node.left);
    if (lh === -1) return -1; // 左がアンバランス

    const rh = height(node.right);
    if (rh === -1) return -1; // 右がアンバランス

    if (Math.abs(lh - rh) > 1) return -1; // このノードでアンバランス

    return Math.max(lh, rh) + 1; // 高さを返す
  };

  return height(root) !== -1;
}
```

上記のような再帰的な処理を行うコードを書くことでクリアした。
heightは与えられたNodeの深さを計算するというもので、アンバランスなときは-1を返す。

この計算を繰り返していくことで、アンバランスなノードがあれば-1を返し、そうでない場合はそのノードの深さを返すロジックになっている。最後の計算処理でheightの結果が-1出ないときはそのノードはバランスが取れているということになり、trueを返す。