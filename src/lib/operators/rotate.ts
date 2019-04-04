import { CanvasService } from '../canvas.service';
import { OperatorFunction } from '../models';
import { base64ToImgElement } from '../utils';

// Need img/canvas source
// Need width/height
/**
 * TODO: Include RotateOptions.rotation
 * TODO: Include RotateOptions.clockwise
 */
export function rotate(options: RotateOptions = {}): OperatorFunction {
  return (base64: string) => {
    return new Promise<string>(resolve => {
      base64ToImgElement(base64).then(image => {
        CanvasService.setSize(image.height, image.width);
        CanvasService.canvasCtx.rotate(90 * Math.PI / 180);
        CanvasService.canvasCtx.translate(0, -CanvasService.canvas.width);
        CanvasService.canvasCtx.drawImage(image.imgElement, 0, 0);
        resolve(CanvasService.canvas.toDataURL());
      });
    });
  };
}

export interface RotateOptions {
  rotation?: 90 | 180 | 270;
  clockwise?: boolean;
}
