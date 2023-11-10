export function searchArray(array: string[], searchArray: string[]): string[] {
  const foundArray = [];
  const set = new Set(array);
  for (let i = 0; i < searchArray.length; i++) {
    if (set.has(searchArray[i])) {
      foundArray.push(searchArray[i]);
    }
  }

  return foundArray;
}

export const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
export const EXCEL_EXTENSION = '.xlsx';
