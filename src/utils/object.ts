export const getKeyByValue = (obj: object, value: any): any =>
  Object.keys(obj).find((key) => obj[key as keyof Object] === value);
