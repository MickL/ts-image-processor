import { ResizeOptions } from './models';
import { resize } from './resize';
import { sharpen } from './sharpen';

export function resizeAndSharpen(blob: string, resizeOptions: ResizeOptions, sharpness?: number): Promise<string> {
  return new Promise<string>(resolve => {
    resize(blob, resizeOptions).then(resizedBlob => {
      sharpen(resizedBlob, sharpness).then(resizedAndSharpenedBlob => {
        resolve(resizedAndSharpenedBlob);
      });
    });
  });
}
