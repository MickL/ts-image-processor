import { CanvasService } from './canvas.service';
import { OutputOptions } from './models';
import { base64ToImgElement } from './utils';

export function rotate(base64: string, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise(resolve => {
    _rotate(base64).then(() => {
      resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
    });
  });
}

function _rotate(base64: string): Promise<void> {
  return new Promise(resolve => {
    base64ToImgElement(base64).then(image => {
      CanvasService.setSize(image.height, image.width);
      CanvasService.canvasCtx.rotate(90 * Math.PI / 180);
      CanvasService.canvasCtx.translate(0, -CanvasService.canvas.width);
      CanvasService.canvasCtx.drawImage(image.element, 0, 0);
      resolve();
    });
  });
}
