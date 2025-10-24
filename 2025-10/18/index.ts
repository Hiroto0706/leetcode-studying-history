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

function sortedArrayToBST(nums: number[]): TreeNode | null {
  const build = (l: number, r: number): TreeNode | null => {
    if (l > r) return null;

    const mid = Math.floor((l + r) / 2);
    const node = new TreeNode(nums[mid]);
    node.left = build(l, mid - 1);
    node.right = build(mid + 1, r);
    return node;
  };

  return build(0, nums.length - 1);
}
