## https://leetcode.com/problems/maximum-depth-of-binary-tree/submissions/1803191704

> Example 1:<br>
> Input: root = [3,9,20,null,null,15,7]<br>
> Output: 3<br><br>
> Example 2:<br>
> Input: root = [1,null,2]<br>
> Output: 2

今日は与えられた Node の深さを答えるというもの。

以下のようにmaxDepthを再帰的に呼び出すことで、深さを計算した。
結果としてはランタイム100%, メモリ効率67%ほどだった。かなり良い結果。

```ts
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

やっていることとしては簡単で、与えられたTreeNodeがnullでない場合に+1をするというロジックになっているので、それを再帰的に行っていき、leftかrightで値の大きい方をMath.max()の結果とするようにしている。
その結果に対して+1したものが最終的な答えというわけである。

例えば、[1,null,2]というnodeがあったとする。
1巡目は1からスタートし、nullではないので次のmaxDepthの呼び出しにいく。
次の呼び出しではleftとrightに分かれるのだが、leftの方はnullなので答えは0が帰ってくる。
rightは2という値があるので、1が帰ってくる。
最終的に`1+Math.max(0, 1)`の計算となり、1+1となり、答えは2になるという感じ。

