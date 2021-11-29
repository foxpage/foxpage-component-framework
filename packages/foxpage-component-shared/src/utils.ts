export const getKey = <T = any>(obj: { [key: string]: any }, key: string): T | undefined => {
  return key.split('.').reduce((prev, subKey) => {
    return prev && prev[subKey];
  }, obj) as any;
};

export function caseStyle(input: string): string {
  const firstLetter = input[0];
  const formated = input.substr(1).replace(/[-_][a-zA-Z]/g, match => match[1].toUpperCase());
  return firstLetter.toUpperCase().concat(formated);
}

export function promiseTimeout<T = any>(promise: Promise<T>, timeout?: number): Promise<T> {
  if (!timeout) {
    return promise;
  }
  return Promise.race([
    promise,
    new Promise((_resolve, reject) => setTimeout(() => reject('timeout.'), timeout)),
  ]) as Promise<T>;
}

export function wrapPromise(val: any) {
  return val instanceof Promise ? val : Promise.resolve(val);
}

/**
 * can not set process.env value to `undefined`, it will stringify to "undefined"
 * if val not a valid string, delete this env
 * @param name
 * @param val
 */
export const setProcessEnv = (name: string, val?: string) => {
  if (typeof val === 'string') {
    process.env[name] = val;
  } else {
    delete process.env[name];
  }
};
