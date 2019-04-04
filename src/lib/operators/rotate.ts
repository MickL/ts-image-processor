import { canvasService } from '../canvasService';
import { OperatorFunction, RotateOptions } from '../models';

export function rotate(options: RotateOptions = {}): OperatorFunction {
  return () => {
    return new Promise<void>(resolve => {
      // Set default values
      if (typeof options.degrees === 'undefined') {
        options.degrees = 90;
      }
      if (typeof options.clockwise === 'undefined') {
        options.clockwise = true;
      }

      if (!options.clockwise) {
        options.degrees = 360 - options.degrees as 90 | 180 | 270;
      }

      const oldWidth  = canvasService.canvas.width;
      const oldHeight = canvasService.canvas.height;
      let newWidth    = oldWidth;
      let newHeight   = oldHeight;

      if (options.degrees === 90 || options.degrees === 270) {
        newWidth  = oldHeight;
        newHeight = oldWidth;
      }

      canvasService.helperCanvas.width  = oldWidth;
      canvasService.helperCanvas.height = oldHeight;
      canvasService.helperCanvasCtx.drawImage(canvasService.canvas, 0, 0);

      canvasService.canvas.width  = newWidth;
      canvasService.canvas.height = newHeight;
      canvasService.canvasCtx.translate(newWidth / 2, newHeight / 2);
      canvasService.canvasCtx.rotate(options.degrees * Math.PI / 180);
      canvasService.canvasCtx.drawImage(canvasService.helperCanvas, -oldWidth / 2, -oldHeight / 2);

      resolve();
    });
  };
}
