import { getImageForBlob } from './helper';

class CanvasServiceSrc {
  readonly canvas         = document.createElement('canvas');
  readonly canvasCtx      = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  private helperCanvas    = document.createElement('canvas');
  private helperCanvasCtx = this.helperCanvas.getContext('2d') as CanvasRenderingContext2D;
  private defaultOptions = {
    jpgQuality: 0.9,
    type: 'image/jpeg',
  };

  constructor() {
  }

  drawImage(src: CanvasImageSource, width: number, height: number, sWidth?: number, sHeight?: number) {
    if (!sWidth || !sHeight) {
      this.canvasCtx.drawImage(src, 0, 0, width, height);
    } else {
      this.canvasCtx.drawImage(src, 0, 0, sWidth, sHeight, 0, 0, width, height);
    }
  }

  drawBlob(blob: string): Promise<void> {
    return new Promise<void>(resolve => {
      getImageForBlob(blob).then(img => {
        this.canvas.width  = img.width;
        this.canvas.height = img.height;
        this.canvasCtx.drawImage(img.element, 0, 0);
        resolve();
      });
    });
  }

  setSize(width: number, height: number) {
    this.canvas.width  = width;
    this.canvas.height = height;
  }

  crop(width: number, height: number) {
    this.helperCanvas.width  = width;
    this.helperCanvas.height = height;
    this.helperCanvasCtx.drawImage(this.canvas, 0, 0, width, height, 0, 0, width, height);
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvasCtx.drawImage(this.helperCanvas, 0, 0);
  }

  getDataUrl(type = this.defaultOptions.type, quality = this.defaultOptions.jpgQuality): string {
    return this.canvas.toDataURL(type, quality);
  }
}

export const CanvasService = new CanvasServiceSrc();
