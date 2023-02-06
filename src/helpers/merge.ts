import { isPlainObject } from './isPlainObjext';

export function merge(dst: PlainObject, ...args: PlainObject[]) {
    let src: PlainObject;
    let p: string;

    while (args.length > 0) {
      src = args.splice(0, 1)[0];

      for (p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          const srcValue = src[p];
          const distValue = dst[p];

          if (isPlainObject(srcValue) && (isPlainObject(distValue) || typeof distValue === 'undefined')) {
            dst[p] = merge(distValue || {}, srcValue);
          } else if (Array.isArray(srcValue) && (Array.isArray(distValue) || typeof distValue === 'undefined')) {
            dst[p] = [...(distValue || []), ...srcValue];
          } else {
            dst[p] = src[p];
          }
        }
      }
    }

    return dst;
  }
