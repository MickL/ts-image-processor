import { CanvasService } from '../canvas.service';
import { OperatorFunction, OutputOptions, SharpenOptions } from '../models';

/**
 * @see http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 * @see http://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality/19235791#19235791
 */
// widht/height
// drawn canvas
export function sharpen(options: SharpenOptions = {}): OperatorFunction {
  return (base64: string) => {
    return new Promise(resolve => {
      // Set default values
      const sharpness = options.sharpness || .15;

      if (sharpness <= 0) {
        resolve(base64);
        return;
      }

      // TODO!
      const imgWidth  = CanvasService.canvas.width;
      const imgHeight = CanvasService.canvas.height;

      const weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
      const katet   = Math.round(Math.sqrt(weights.length));
      const half    = (katet * 0.5) | 0;
      const dstData = CanvasService.canvasCtx.createImageData(imgWidth, imgHeight);
      const dstBuff = dstData.data;
      const srcBuff = CanvasService.canvasCtx.getImageData(0, 0, imgWidth, imgHeight).data;
      let y         = imgHeight;

      while (y--) {
        let x = imgWidth;

        while (x--) {

          const sy     = y;
          const sx     = x;
          const dstOff = (y * imgWidth + x) * 4;
          let r        = 0;
          let g        = 0;
          let b        = 0;
          let a        = 0;

          for (let cy = 0; cy < katet; cy++) {
            for (let cx = 0; cx < katet; cx++) {

              const scy = sy + cy - half;
              const scx = sx + cx - half;

              if (scy >= 0 && scy < imgHeight && scx >= 0 && scx < imgWidth) {
                const srcOff = (scy * imgWidth + scx) * 4;
                const wt     = weights[cy * katet + cx];

                r += srcBuff[srcOff] * wt;
                g += srcBuff[srcOff + 1] * wt;
                b += srcBuff[srcOff + 2] * wt;
                a += srcBuff[srcOff + 3] * wt;
              }
            }
          }

          dstBuff[dstOff]     = r * sharpness + srcBuff[dstOff] * (1 - sharpness);
          dstBuff[dstOff + 1] = g * sharpness + srcBuff[dstOff + 1] * (1 - sharpness);
          dstBuff[dstOff + 2] = b * sharpness + srcBuff[dstOff + 2] * (1 - sharpness);
          dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
      }

      CanvasService.canvasCtx.putImageData(dstData, 0, 0);

      resolve(CanvasService.canvas.toDataURL());
    });
  };
}
