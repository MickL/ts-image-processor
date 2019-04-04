import { CanvasService } from '../canvas.service';
import { OperatorFunction } from '../models';
import { base64ToImgElement } from '../utils';

// Need img/canvas source
// Need width/height
export function mirror(): OperatorFunction {
  return (base64: string) => {
    return new Promise(resolve => {
      base64ToImgElement(base64).then(image => {
        CanvasService.setSize(image.width, image.height);
        CanvasService.canvasCtx.scale(-1, 1);
        CanvasService.canvasCtx.drawImage(image.imgElement, -image.width, 0);
        resolve(CanvasService.canvas.toDataURL());
      });
    });
  };
}
