export const isPlainObject = (value: unknown) =>
  typeof value === 'object' &&
  value !== null &&
  value.constructor === Object &&
  Object.prototype.toString.call(value) === '[object Object]';
