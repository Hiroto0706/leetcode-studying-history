function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let a = nums1.length <= nums2.length ? nums1 : nums2;
  let b = nums1.length <= nums2.length ? nums2 : nums1;

  const total = a.length + b.length;
  const isEven = total % 2 === 0;

  const k1 = Math.floor((total + 1) / 2);
  const k2 = Math.floor((total + 2) / 2);

  const kth = (a: number[], b: number[], k: number): number => {
    while (true) {
      if (a.length === 0) return b[k - 1];
      if (b.length === 0) return a[k - 1];
      if (k === 1) return Math.min(a[0], b[0]);

      const i = Math.min(a.length, Math.floor(k / 2));
      const j = k - i;
      const ai_1 = a[i - 1];
      const bj_1 = b[j - 1];

      if (ai_1 <= bj_1) {
        a = a.slice(i);
        k -= i;
      } else {
        b = b.slice(j);
        k -= j;
      }
    }
  };

  if (isEven) {
    return (kth(a, b, k1) + kth(a, b, k2)) / 2;
  } else {
    return kth(a, b, k1);
  }
}
