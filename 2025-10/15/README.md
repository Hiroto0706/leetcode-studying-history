## https://leetcode.com/problems/symmetric-tree/submissions/1801899101

> Example 1:<br>
> Input: root = [1,2,2,3,4,4,3]
> Output: true<br><br>
> Example 2:<br>
> Input: root = [1,2,2,null,3,null,3]
> Output: false

渡された木構造の Node を半分に折った時に左右対称かどうかを判別するプログラムを書くという問題である。

内容としては結構簡単だった。
過去に解いたことある問題をちょろっと変えたら行ける内容だったから。

以下のコードを書くことでクリアすることができた。
しかし、この内容ではランタイムが全体の 18%, メモリ効率が 71%だった。

ランタイムがちょっと低めなのが悔しい。

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

function isSymmetric(root: TreeNode | null): boolean {
  // nodeの比較を行える土壌があることを確認する
  if (!root) return true;
  if (!root.left && !root.right) return true;
  if (!root.left || !root.right) return false;

  let left = root.left;
  let right = root.right;
  const stack: Array<[TreeNode | null, TreeNode | null]> = [];
  stack.push([left, right]);

  while (stack.length > 0) {
    const pair = stack.pop();
    if (!pair) continue;

    const [left, right] = pair;
    if (!left && !right) continue;
    if (!left || !right) return false;
    if (left.val !== right.val) return false;

    stack.push([left.left, right.right]);
    stack.push([left.right, right.left]);
  }

  return true;
}
```

行っている内容を解説すると、まず最初の条件分岐で与えられた Node が比較を行うにふさわしい内容であるかどうかを確認する。

比較できる Node であることがわかったら、2025/10/11 に解いた問題をベースとして組み立てていくことでクリアすることができた。

この問題において重要なのは stack 変数である。
この stack は比較を行うべき Node の情報が格納されており、ここから node を取り出して比較を行っていくようになっている。

はじめに left と right の node を push し、そこからループ処理を行なっていく。
stack が 0 になるまでループを行う。
そのため、node が左右対称と確定でみなせないような条件分岐の際は continue していることがわかるだろう。

このように node を stack に push 氏、比較を行っていくという作業を繰り返していくことで、最終的に左右対称の Node かどうかの判別が行えるというわけである。

<details>
<summary>フィードバック</summary>
いいね！方針も実装も正しくて、**「左右をミラーに比較する」**がちゃんとできてる👏
その上で、ランタイム18%が気になるとのことなので、**読みやすさ＋微速化**の観点でフィードバックするね。

---

## ここを直すとスッキリ＆微速化

1. **前置の三つの if は不要**
   ループ内で `null` をハンドリングしているので、

   ```ts
   if (!root) return true;
   if (!root.left && !root.right) return true;
   if (!root.left || !root.right) return false;
   ```

   は省ける（最初に `stack.push([root.left, root.right])` して統一処理にすると分岐減でほんの少し速い）。

2. **`pair` の「undefined ガード」は不要**
   `while (stack.length > 0)` なので `pop()` が `undefined` を返すことはない。
   → `const [l, r] = stack.pop()!;` と **non-null assertion** にして分岐を 1 つ減らせる。

3. **変数名のシャドーイング**を避ける
   ループ外の `left/right` とループ内の分解後 `left/right` が被ってる。
   → `l/r` や `nodeL/nodeR` にすると可読性 UP。

4. **null ペアを push しない**
   毎回 `[left.left, right.right]` の **null ペア**まで push するとスタックが太る。
   子を push する前に「片側だけ null じゃないか」を先に判定して、**不一致なら即 return**、
   **両方 non-null のときだけ** push するのが軽い。

5. **ペア配列を作らず「フラットなスタック」にする**（小さなヒープ削減）
   `[l, r]` のタプルを毎回生成せず、**1 本のスタックに 2 個ずつ**積む：

   ```ts
   const st: (TreeNode | null)[] = [];
   st.push(root.left, root.right);
   while (st.length) {
     const r = st.pop()!; // 取り出し順に注意
     const l = st.pop()!;
     if (!l && !r) continue;
     if (!l || !r || l.val !== r.val) return false;

     // 次の比較（両方あるときだけ）
     if ((l.left && !r.right) || (!l.left && r.right)) return false;
     if ((l.right && !r.left) || (!l.right && r.left)) return false;
     if (l.left && r.right) st.push(l.left, r.right);
     if (l.right && r.left) st.push(l.right, r.left);
   }
   return true;
   ```

   配列ペア（タプル）を作らないぶんアロケーションが減る → 微妙に速くなることがある。

6. **再帰版を試す**（環境によっては最速）
   JS/V8 だと関数コールのオーバーヘッドで遅くなることもあるけど、
   少ないノードでは **再帰の分岐最小・分配最小**が効いて速いことも。ベースラインとして比較価値あり。

   ```ts
   function isSymmetric(root: TreeNode | null): boolean {
     const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
       if (!a && !b) return true;
       if (!a || !b || a.val !== b.val) return false;
       return mirror(a.left, b.right) && mirror(a.right, b.left);
     };
     return mirror(root, root);
   }
   ```

7. **Queue の `shift()` は避ける**
   BFS で書き直す場合も、`shift()` は O(n) で遅い。
   使うなら **手作りデック** or **スタック（push/pop）** のままが吉。

---

## 複雑度と“パーセンタイル”の話

- アルゴリズム自体は **時間 O(n), 空間 O(h)**（h: 高さ）で最善クラス。
- LeetCode のランタイム percentile は**入力分布/同時実行環境/ヒープ状態**に左右されがち。
  上の小改善（特に「null ペアを push しない」「フラットスタック」）で地味に効くことが多いよ。

---

## まとめ

- コアのロジックは正しい。
- **冗長分岐の削減**、**無駄なペア生成の削減**、**null の事前判定**でヒープ負荷を下げられる。
- 参考に再帰版も比較して、速い方を採用するのがオススメ。

必要なら、あなたの今のコードに**差分パッチ**形式で最小変更案も出せるよ。どうする？

</details>

<br>

他の人のコードを見ると、以下のコードがランタイム 100%, メモリ 80%とかなり優秀な成果を収めていた。

あ〜、isMirror を再帰的に呼び出し、すべて true だったらこの Node は左右対称ってことを判断しているのか。めっちゃクリーンな解き方。

```ts
const isSymmetric = (root: TreeNode | null): boolean => {
  return isMirror(root, root);
};

const isMirror = (t1: TreeNode | null, t2: TreeNode | null): boolean => {
  if (t1 === null && t2 === null) return true;
  if (t1 === null || t2 === null) return false;

  return (
    t1.val === t2.val &&
    isMirror(t1.left, t2.right) &&
    isMirror(t1.right, t2.left)
  );
};
```
