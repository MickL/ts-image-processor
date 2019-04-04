import { canvasService } from './canvasService';
import { OperatorFunction, SrcOptions } from './models';

export class ImageProcess {
  constructor(private base64: string, private options: SrcOptions) {
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

    return new Promise(resolve => {
      canvasService.drawBase64(this.base64).then(() => {
        operations.reduce((promiseChain, currentOperation) => {
          return promiseChain.then(() =>
            currentOperation());
        }, Promise.resolve())
          .then(() => {
            resolve(canvasService.getDataUrl(this.options.type, this.options.jpgQuality));
          });
      });
    });
  }
}
