import { CanvasService } from '../canvas.service';
import { OperatorFunction, OutputOptions } from '../models';
import { base64ToImgElement } from '../utils';

// Need img/canvas source
// Need width/height
export function output(options: OutputOptions = {}): OperatorFunction {
  return (base64: string) => {
    return new Promise<string>(resolve => {
      // Set default values
      const type        = options.type || 'image/jpeg';
      const jpegQuality = options.jpgQuality || .9;

      base64ToImgElement(base64).then(imgData => {
        CanvasService.setSize(imgData.width, imgData.height);
        CanvasService.drawImage(imgData.imgElement);
        resolve(CanvasService.getDataUrl(type, jpegQuality));
      });
    });
  };
}
