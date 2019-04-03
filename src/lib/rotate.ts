import { CanvasService } from './canvas.service';
import { getImageForBlob } from './helper';
import { OutputOptions } from './models';

export function rotate(blob: string, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise(resolve => {
    _rotate(blob).then(() => {
      resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
    });
  });
}

function _rotate(blob: string): Promise<void> {
  return new Promise(resolve => {
    getImageForBlob(blob).then(image => {
      CanvasService.setSize(image.height, image.width);
      CanvasService.canvasCtx.rotate(90 * Math.PI / 180);
      CanvasService.canvasCtx.translate(0, -CanvasService.canvas.width);
      CanvasService.canvasCtx.drawImage(image.element, 0, 0);
      resolve();
    });
  });
}
