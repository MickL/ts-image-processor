import { OperatorFunction } from '../models';

export function noop(): OperatorFunction {
  return () => {
    return Promise.resolve();
  };
}
