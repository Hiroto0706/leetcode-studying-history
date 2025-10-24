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
