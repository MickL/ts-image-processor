import { ImageProcess } from './image-process.model';
import { SrcOptions } from './models';

/**
 * TODO: Error-handling when input something not base64
 * TODO: Accept `string[]`
 * TODO: Accept `File`
 * TODO: Accept `File[]`
 * TODO: Accept `FileList`
 */
class ImageProcessorService {
  src(base64: string, options: SrcOptions = {}): ImageProcess {
    return new ImageProcess(base64);
  }
}

export const imageProcessor = new ImageProcessorService();
