export const getWindowPages = (
  current: number,
  total: number,
  windowSize: number = 7
): number[] => {
  if (total <= windowSize) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  let start = current - Math.floor(windowSize / 2);
  let end = current + Math.floor(windowSize / 2);

  if (start < 1) {
    start = 1;
    end = windowSize;
  }

  if (end > total) {
    end = total;
    start = total - windowSize + 1;
  }

  const pages: number[] = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};