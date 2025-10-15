// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

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
