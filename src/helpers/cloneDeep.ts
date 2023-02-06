export const cloneDeep = <T extends object = object>(obj: T, transform?: (item: T) => T | undefined) => {
    return (function _cloneDeep(
      item: T,
      transform?: (item: T) => T | undefined
    ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
      if (item === null || typeof item !== 'object') {
        return item;
      }

      if (typeof transform !== 'undefined') {
        const result = transform(item);

        if (result) {
          return result;
        }
      }

      if (item instanceof Date) {
        return new Date(item.valueOf());
      }

      if (item instanceof Array) {
        const copy: unknown[] = [];

        item.forEach((_, i) => (copy[i] = _cloneDeep(item[i], transform)));

        return copy;
      }

      if (item instanceof Set) {
        const copy: Set<unknown> = new Set();

        item.forEach((v) => copy.add(_cloneDeep(v, transform)));

        return copy;
      }

      if (item instanceof Map) {
        const copy: Map<unknown, unknown> = new Map();

        item.forEach((v, k) => copy.set(k, _cloneDeep(v, transform)));

        return copy;
      }

      if (item instanceof Object) {
        const copy: object = {};

        // @ts-ignore
        Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s], transform)));

        // @ts-ignore
        Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k], transform)));

        return copy;
      }

      throw new Error(`Unable to copy object: ${item}`);
    })(obj, transform);
  };
