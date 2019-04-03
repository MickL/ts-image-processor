import { CanvasService } from './canvas.service';
import { OutputOptions, SharpenOptions } from './models';

// TODO: Resize multiple blob's at once
// TODO: Accept File, too
export function sharpen(blob: string, sharpenOptions: SharpenOptions, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise<string>(resolve => {
    CanvasService.drawBlob(blob).then(() => {
      _sharpen(sharpenOptions).then(() => {
        resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
      });
    });
  });
}

/**
 * @see http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 * @see http://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality/19235791#19235791
 */
export function _sharpen(options: SharpenOptions): Promise<void> {
  return new Promise(resolve => {
    if (options.sharpness <= 0) {
      resolve();
      return;
    }

    console.log(`Sharpening image by ${options.sharpness * 100}%`);

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

        dstBuff[dstOff]     = r * options.sharpness + srcBuff[dstOff] * (1 - options.sharpness);
        dstBuff[dstOff + 1] = g * options.sharpness + srcBuff[dstOff + 1] * (1 - options.sharpness);
        dstBuff[dstOff + 2] = b * options.sharpness + srcBuff[dstOff + 2] * (1 - options.sharpness);
        dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
      }
    }

    CanvasService.canvasCtx.putImageData(dstData, 0, 0);

    resolve();
  });
}
