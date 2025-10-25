## https://leetcode.com/problems/minimum-depth-of-binary-tree/submissions/1810823809

> Example 1:<br>
> Input: root = [3,9,20,null,null,15,7]<br>
> Output: 2<br><br>
> Example 2:<br>
> Input: root = [2,null,3,null,4,null,5,null,6]<br>
> Output: 5<br>

こんな感じで与えられた Node の最も小さい高さを返すという問題。

2025-10/22 のディレクトリの問題とかなりにているので、それと同じような感じで回答した。
クリアはしたものの、ランタイムとメモリの効率が悪いことがわかった。

回答としては以下の感じ。

```ts
function minDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;

    const lh = height(node.left);
    const rh = height(node.right);

    if (!node.left) return rh + 1;
    if (!node.right) return lh + 1;

    return Math.min(lh, rh) + 1;
  };

  return height(root);
}
```

やっていることとしては、root の left と right から最も小さい高さの値を返すというものになる。

これ効率とランタイムが悪いのは、全てのノードを見ているからかな？と思った。
上のノードから順に値を見ていき、一つの node が null でそれ以外の値に node が続いていればその node が一番小さい値って満たせるから早期リターン的なことをすればもっと早くなるのかなと思った。

この処理でやっていることとしては、再帰的に height を実行し node の高さを計算していく。
height では、left と right の高さを計算し、小さい方を返すというもの。

これを繰り返していくと、すべての node の高さがわかる。
そのわかった高さのうち小さい方を返すので、最も小さい値がわかるという感じ。
