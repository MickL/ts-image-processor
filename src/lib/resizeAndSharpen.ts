import { CanvasService } from './canvas.service';
import { OutputOptions, ResizeOptions, SharpenOptions } from './models';
import { resize } from './resize';
import { _sharpen } from './sharpen';

// TODO: Resize multiple base64's at once
// TODO: Accept File, too
// TODO: Instead of this function operations should be pipable, e.g. `imageProcessor.pipe(resize(), sharpen())`
export function resizeAndSharpen(base64: string, resizeOptions: ResizeOptions, sharpenOptions: SharpenOptions, outputOptions: OutputOptions = {}): Promise<string> {
  return new Promise<string>(resolve => {
    resize(base64, resizeOptions).then(() => {
      // TODO: sharpenOptions.onlyWhenResizedPrct
      _sharpen(sharpenOptions).then(() => {
        resolve(CanvasService.getDataUrl(outputOptions.type, outputOptions.jpgQuality));
      });
    });
  });
}
