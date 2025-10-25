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
