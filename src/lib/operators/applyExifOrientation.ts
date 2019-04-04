import { OperatorFunction } from '../models';

export function applyExifOrientation(): OperatorFunction {
  return (base64: string) => {
    return new Promise<string>(resolve => {
      // TODO
      resolve(base64);
    });
  };
}
