/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  if (nums2.length === 0) return;
  if (nums1.length === 0) {
    nums1.push(...nums2);
    return;
  }

  const nums2Len = nums2.length;
  const nums1Len = nums1.length - nums2Len;
  nums1.length = nums1Len;

  const tmp: number[] = nums1.concat(nums2).sort((a, b) => a - b);
  nums1.length = 0;
  nums1.push(...tmp);

  return;
}
