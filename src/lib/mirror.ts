import { CanvasService } from './canvas.service';
import { getImageForBlob } from './helper';
import { OutputOptions } from './models';

export function mirror(blob: string, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise(resolve => {
    _mirror(blob).then(() => {
      resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
    });
  });
}

function _mirror(blob: string): Promise<void> {
  return new Promise(resolve => {
    getImageForBlob(blob).then(image => {
      CanvasService.setSize(image.width, image.height);
      CanvasService.canvasCtx.scale(-1, 1);
      CanvasService.canvasCtx.drawImage(image.element, -image.width, 0);
      resolve();
    });
  });
}
