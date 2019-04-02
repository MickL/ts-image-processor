import { resize, ResizeOptions } from './resize';
import { sharpen } from './sharpen';

export function resizeAndSharpen(blob: string, resizeOptions: ResizeOptions, sharpness?: number): Promise<string> {
  return new Promise<string>(resolve => {
    resize(blob, resizeOptions).then(resizedBlob => {
      // TODO: Width / Height ?
      sharpen(resizedBlob, sharpness).then(resizedAndSharpenedBlob => {
        resolve(resizedAndSharpenedBlob);
      });
    })
  });
}
