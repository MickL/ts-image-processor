import { CanvasService } from './canvas.service';
import { base64ToImgElement } from './utils';
import { OutputOptions, ResizeOptions } from './models';

// TODO: Resize multiple base64's at once
// TODO: Accept File, too
export function resize(base64: string, resizeOptions: ResizeOptions, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise(resolve => {
    _resize(base64, resizeOptions).then(() => {
      resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
    });
  });
}

/**
 * @see https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
 * @see http://stackoverflow.com/a/19262385/5688490
 * @see http://stackoverflow.com/a/19235791/5688490
 * @see http://stackoverflow.com/a/19262385/5688490
 */
export function _resize(base64: string, options: ResizeOptions): Promise<void> {
  return new Promise(resolve => {
    base64ToImgElement(base64).then(img => {
      const resizeNeeded = img.width > options.maxWidth || img.height > options.maxHeight;

      if (!resizeNeeded) {
        console.log(`No resizing needed, image of ${img.width}x${img.height}px is smaller than ${options.maxWidth}x${options.maxHeight}px`);
        CanvasService.setSize(img.width, img.height);
        CanvasService.drawImage(img.element, img.width, img.height);
      } else {
        let newWidth: number;
        let newHeight: number;
        let downscalingSteps: number;

        // TODO: Is this really working for all formats? What if maxWidth = 2000, maxHeight = 20 ?
        if (img.width > img.height) {
          newWidth         = options.maxWidth;
          newHeight        = Math.round(img.height * newWidth / img.width);
          downscalingSteps = Math.ceil(Math.log(img.width / newWidth) / Math.log(2));
        } else {
          newHeight        = options.maxHeight;
          newWidth         = Math.round(img.width * newHeight / img.height);
          downscalingSteps = Math.ceil(Math.log(img.height / newHeight) / Math.log(2));
        }

        console.log(`Resizing from ${img.width}x${img.height}px to ${newWidth}x${newHeight} in ${downscalingSteps} steps`);

        if (downscalingSteps > 1) {
          // To get the best result, we need to resize the image by 50% again and again until we reach the final dimensions
          // Step 1
          let oldScale         = 1;
          let currentStepScale = .5;
          CanvasService.setSize(img.width * currentStepScale, img.height * currentStepScale);
          CanvasService.drawImage(img.element, img.width * currentStepScale, img.height * currentStepScale);

          // Step i
          for (let i = 2; i < downscalingSteps; i++) {
            oldScale         = currentStepScale;
            currentStepScale = currentStepScale * .5;
            CanvasService.drawImage(CanvasService.canvas, img.width * currentStepScale, img.height * currentStepScale, img.width * oldScale, img.height * oldScale);
          }

          // Down-scaling step i+1 (draw final result)
          CanvasService.drawImage(CanvasService.canvas, newWidth, newHeight, img.width * currentStepScale, img.height * currentStepScale);
          CanvasService.crop(newWidth, newHeight);
        } else {
          // The image can directly be resized to the final dimensions
          CanvasService.setSize(newWidth, newHeight);
          CanvasService.drawImage(img.element, newWidth, newHeight);
        }
      }

      resolve();
    });
  });
}
