import { CanvasService } from './canvas.service';

const defaultOptions = {
  jpgQuality: 0.9
};

/**
 * @see https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
 * @see http://stackoverflow.com/a/19262385/5688490
 * @see http://stackoverflow.com/a/19235791/5688490
 * @see http://stackoverflow.com/a/19262385/5688490
 */
// TODO: Resize multiple blob's at once
export function resize(blob: string, options: ResizeOptions): Promise<string> {
  return new Promise<string>(resolve => {
    const img      = document.createElement('img');
    let resultBlob = blob;

    img.onload = () => {
      const imgWidth     = img.naturalWidth || img.width;
      const imgHeight    = img.naturalHeight || img.height;
      const resizeNeeded = imgWidth > options.maxWidth || imgHeight > options.maxHeight;

      if (!resizeNeeded) {
        console.log(`No resizing needed, image of ${imgWidth}x${imgHeight}px is smaller than ${options.maxWidth}x${options.maxHeight}px`);
      } else {
        let newWidth: number;
        let newHeight: number;
        let downscalingSteps: number;

        // TODO: Is this really working for all formats? What if maxWidth = 2000, maxHeight = 20 ?
        if (imgWidth > imgHeight) {
          newWidth         = options.maxWidth;
          newHeight        = Math.round(imgHeight * newWidth / imgWidth);
          downscalingSteps = Math.ceil(Math.log(imgWidth / newWidth) / Math.log(2));
        } else {
          newHeight        = options.maxHeight;
          newWidth         = Math.round(imgWidth * newHeight / imgHeight);
          downscalingSteps = Math.ceil(Math.log(imgHeight / newHeight) / Math.log(2));
        }

        console.log(`Resizing from ${imgWidth}x${imgHeight}px to ${newWidth}x${newHeight} in ${downscalingSteps} steps`);

        if (downscalingSteps > 1) {
          // To get the best result, we need to resize the image by 50% again and again until we reach the final dimensions
          // Step 1
          let oldScale         = 1;
          let currentStepScale = .5;
          CanvasService.setSize(imgWidth * currentStepScale, imgHeight * currentStepScale);
          CanvasService.drawImage(img, imgWidth * currentStepScale, imgHeight * currentStepScale);

          // Step i
          for (let i = 2; i < downscalingSteps; i++) {
            oldScale         = currentStepScale;
            currentStepScale = currentStepScale * .5;
            CanvasService.drawImage(CanvasService.getCanvas(), imgWidth * currentStepScale, imgHeight * currentStepScale, imgWidth * oldScale, imgHeight * oldScale);
          }

          // Down-scaling step i+1 (draw final result)
          CanvasService.drawImage(CanvasService.getCanvas(), newWidth, newHeight, imgWidth * currentStepScale, imgHeight * currentStepScale);

          // Get cropped blob
          resultBlob = CanvasService.getCropDataUrl(newWidth, newHeight, 'image/jpeg', options.jpgQuality || defaultOptions.jpgQuality);
        } else {
          // The image can directly be resized to the final dimensions
          CanvasService.setSize(newWidth, newHeight);
          CanvasService.drawImage(img, newWidth, newHeight);
        }
      }

      resolve(resultBlob);
    };

    img.src = blob;
  });
}

export interface ResizeOptions {
  maxWidth: number;
  maxHeight: number;
  jpgQuality?: number;
}
