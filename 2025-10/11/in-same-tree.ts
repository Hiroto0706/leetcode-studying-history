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
