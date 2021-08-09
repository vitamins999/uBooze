// Creates an array of a specified length and sets the values from start value to end value
export const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
