export const suffixArray = (str: string) => {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.slice(i));
  }
  arr.sort();
  return arr;
};

// function get short description of chat
export const shortDescription = (str: string, number = 100) => {
  return str.slice(0, number);
};
