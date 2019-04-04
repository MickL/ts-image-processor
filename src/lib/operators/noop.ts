import { OperatorFunction } from '../models';

export function noop(): OperatorFunction {
  return (base64: string) => {
    return Promise.resolve(base64);
  };
}
