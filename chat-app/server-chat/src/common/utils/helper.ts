export const suffixArray = (str: string) => {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.slice(i));
  }
  arr.sort();
  return arr;
};
