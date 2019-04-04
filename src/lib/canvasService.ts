import { base64ToImgElement } from './utils';

class CanvasServiceSrc {
  readonly canvas         = document.createElement('canvas');
  readonly canvasCtx      = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  readonly helperCanvas    = document.createElement('canvas');
  readonly helperCanvasCtx = this.helperCanvas.getContext('2d') as CanvasRenderingContext2D;

  constructor() {
  }

  drawImage(src: CanvasImageSource, width?: number, height?: number, sWidth?: number, sHeight?: number) {
    if (!width || !height) {
      this.canvasCtx.drawImage(src, 0, 0);
    } else if (!sWidth || !sHeight) {
      this.canvasCtx.drawImage(src, 0, 0, width, height);
    } else {
      this.canvasCtx.drawImage(src, 0, 0, sWidth, sHeight, 0, 0, width, height);
    }
  }

  drawBase64(base64: string): Promise<void> {
    return new Promise<void>(resolve => {
      base64ToImgElement(base64).then(img => {
        this.canvas.width  = img.width;
        this.canvas.height = img.height;
        this.canvasCtx.drawImage(img.imgElement, 0, 0);
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
    this.canvas.width  = width;
    this.canvas.height = height;
    this.canvasCtx.drawImage(this.helperCanvas, 0, 0);
  }

  resize(width: number, height: number) {
    this.helperCanvas.width  = width;
    this.helperCanvas.height = height;
    this.helperCanvasCtx.drawImage(this.canvas, 0, 0, width, height);
    this.canvas.width  = width;
    this.canvas.height = height;
    this.canvasCtx.drawImage(this.helperCanvas, 0, 0);
  }

  getDataUrl(type: string, jpgQuality: number): string {
    return this.canvas.toDataURL(type, jpgQuality);
  }
}

export const canvasService = new CanvasServiceSrc();
