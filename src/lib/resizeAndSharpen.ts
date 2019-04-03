import { CanvasService } from './canvas.service';
import { OutputOptions, ResizeOptions, SharpenOptions } from './models';
import { resize } from './resize';
import { sharpen } from './sharpen';

// TODO: Resize multiple blob's at once
// TODO: Accept File, too
// TODO: Instead of this function operations should be pipable, e.g. `imageProcessor.pipe(resize(), sharpen())`
export function resizeAndSharpen(blob: string, resizeOptions: ResizeOptions, sharpenOptions: SharpenOptions, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise<string>(resolve => {
    resize(blob, resizeOptions).then(() => {
      // TODO kein blob!
      // TODO: sharpenOptions.onlyWhenResizedPrct
      sharpen(blob, sharpenOptions).then(() => {
        resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
      });
    });
  });
}
