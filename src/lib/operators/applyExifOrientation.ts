import { OperatorFunction } from '../models';

export function applyExifOrientation(): OperatorFunction {
  return () => {
    return new Promise(resolve => {
      resolve();
    });
  };
}
