import { CanvasService } from './canvas.service';
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
    CanvasService.drawBlob(blob); // TODO
    resolve();
  });
}
