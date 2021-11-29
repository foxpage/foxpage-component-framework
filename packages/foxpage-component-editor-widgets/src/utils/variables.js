export const isVariables = (val, { isMulti } = { isMulti: false }) => {
  if (typeof val !== 'string') return false;
  if (isMulti) {
    return /{{(.+?)}}/.test(val);
  }
  return /^{{(.+?)}}$/g.test(val);
};
