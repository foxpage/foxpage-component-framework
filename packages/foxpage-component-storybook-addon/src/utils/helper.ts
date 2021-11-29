export const getAbsoluteTypes = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1).toLocaleLowerCase();
};
