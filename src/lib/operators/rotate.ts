import { canvasService } from '../canvasService';
import { OperatorFunction, RotateOptions } from '../models';

export function rotate(options: RotateOptions = {}): OperatorFunction {
  return () => {
    return new Promise<void>(resolve => {
      // Set default values
      if (typeof options.degree === 'undefined') {
        options.degree = 90;
      }
      if (typeof options.clockwise === 'undefined') {
        options.clockwise = true;
      }

      if (!options.clockwise) {
        options.degree = 360 - options.degree as 90 | 180 | 270;
      }

      if (options.degree !== 0 && options.degree !== 90 && options.degree !== 180 && options.degree !== 270 && options.degree !== 360) {
        throw(new Error(`Rotation degree needs to be 0, 90, 180, 270 or 360.`));
        return;
      } else if (options.degree === 0 || options.degree === 360) {
        return;
      }

      const oldWidth  = canvasService.canvas.width;
      const oldHeight = canvasService.canvas.height;
      let newWidth    = oldWidth;
      let newHeight   = oldHeight;

      if (options.degree === 90 || options.degree === 270) {
        newWidth  = oldHeight;
        newHeight = oldWidth;
      }

      canvasService.helperCanvas.width  = oldWidth;
      canvasService.helperCanvas.height = oldHeight;
      canvasService.helperCanvasCtx.drawImage(canvasService.canvas, 0, 0);

      canvasService.canvas.width  = newWidth;
      canvasService.canvas.height = newHeight;
      canvasService.canvasCtx.translate(newWidth / 2, newHeight / 2);
      canvasService.canvasCtx.rotate(options.degree * Math.PI / 180);
      canvasService.canvasCtx.drawImage(canvasService.helperCanvas, -oldWidth / 2, -oldHeight / 2);

      resolve();
    });
  };
}
