import { canvasService } from '../canvasService';
import { OperatorFunction } from '../models';

export function mirror(): OperatorFunction {
  return () => {
    return new Promise(resolve => {
      canvasService.canvasCtx.scale(-1, 1);
      canvasService.canvasCtx.drawImage(canvasService.canvas, -canvasService.canvas.width, 0);
      canvasService.canvasCtx.resetTransform();
      resolve();
    });
  };
}
