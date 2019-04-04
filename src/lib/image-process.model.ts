import { OperatorFunction } from './models';

export class ImageProcess {
  constructor(private base64: string) {
  }

  /**
   * Used to stitch together functional operators into a chain.
   * @method pipe
   * @returns Processed base64 string
   *
   * ### Example
   * ```ts
   * import { imageProcessor, pipe, resize } from 'ts-image-processor';
   *
   * imageProcessor.src(myBase64String)
   *   .pipe(
   *     resize({maxWidth: 800, maxHeight: 800}),
   *     sharpen(),
   *   )
   *   .then(processedBase64 => {
   *     // Do whatever
   *   });
   * ```
   */
  pipe(...operations: OperatorFunction[]): Promise<string> {
    if (!operations) {
      return Promise.resolve(this.base64);
    }

    return operations.reduce((promiseChain, currentOperation) => {
      return promiseChain.then(base64 =>
        currentOperation(base64).then(currentBase64 => currentBase64));
    }, Promise.resolve(this.base64));
  }
}
