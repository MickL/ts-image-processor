import { canvasService } from '../canvasService';
import { OperatorFunction, ResizeOptions } from '../models';

/**
 * @see https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
 * @see http://stackoverflow.com/a/19262385/5688490
 * @see http://stackoverflow.com/a/19235791/5688490
 * @see http://stackoverflow.com/a/19262385/5688490
 *
 * TODO: Resize multiple base64's at once
 * TODO: Accept File, too
 */
export function resize(options: ResizeOptions): OperatorFunction {
  return () => {
    return new Promise(resolve => {
      const oldWidth  = canvasService.canvas.width;
      const oldHeight = canvasService.canvas.height;

      const resizeNeeded = oldWidth > options.maxWidth || oldHeight > options.maxHeight;

      if (!resizeNeeded) {
        console.log(`No resizing needed, image of ${oldWidth}x${oldHeight}px is smaller than ${options.maxWidth}x${options.maxHeight}px`);
        resolve();
      } else {
        let newWidth: number;
        let newHeight: number;
        let downscalingSteps: number;

        // TODO: Is this really working for all formats? What if maxWidth = 2000, maxHeight = 20 ?
        if (oldWidth > oldHeight) {
          newWidth         = options.maxWidth;
          newHeight        = Math.round(oldHeight * newWidth / oldWidth);
          downscalingSteps = Math.ceil(Math.log(oldWidth / newWidth) / Math.log(2));
        } else {
          newHeight        = options.maxHeight;
          newWidth         = Math.round(oldWidth * newHeight / oldHeight);
          downscalingSteps = Math.ceil(Math.log(oldHeight / newHeight) / Math.log(2));
        }

        console.log(`Resizing from ${oldWidth}x${oldHeight}px to ${newWidth}x${newHeight} in ${downscalingSteps} steps`);

        if (downscalingSteps === 1) {
          // The image can directly be resized to the final dimensions
          canvasService.resize(newWidth, newHeight);
        } else {
          // To get the best result, we need to resize the image by 50% again and again until we reach the final dimensions
          // Step 1
          let oldScale         = 1;
          let currentStepScale = 1;
          // canvasService.resize(oldWidth * currentStepScale, oldHeight * currentStepScale);

          // Step i
          for (let i = 1; i < downscalingSteps; i++) {
            oldScale         = currentStepScale;
            currentStepScale = currentStepScale * .5;
            canvasService.drawImage(canvasService.canvas, oldWidth * currentStepScale, oldHeight * currentStepScale, oldWidth * oldScale, oldHeight * oldScale);
          }

          // Down-scaling step i+1 (draw final result)
          canvasService.drawImage(canvasService.canvas, newWidth, newHeight, oldWidth * currentStepScale, oldHeight * currentStepScale);
          canvasService.crop(newWidth, newHeight);
        }
      }

      resolve();
    });
  };
}
