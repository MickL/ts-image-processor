import { CanvasService } from './canvas.service';
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
    CanvasService.drawBlob(blob); // TODO
    resolve();
  });
}
