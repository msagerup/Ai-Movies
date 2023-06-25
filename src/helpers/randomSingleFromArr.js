export const randomSingleFromArr = (arr) => {
  if (arr === undefined || arr.length === 0) return;
 
  return arr[Math.floor(Math.random() * arr.length)];
};
