import { CanvasService } from './canvas.service';
import { base64ToImgElement } from './utils';
import { OutputOptions } from './models';

export function mirror(base64: string, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise(resolve => {
    _mirror(base64).then(() => {
      resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
    });
  });
}

function _mirror(base64: string): Promise<void> {
  return new Promise(resolve => {
    base64ToImgElement(base64).then(image => {
      CanvasService.setSize(image.width, image.height);
      CanvasService.canvasCtx.scale(-1, 1);
      CanvasService.canvasCtx.drawImage(image.element, -image.width, 0);
      resolve();
    });
  });
}
