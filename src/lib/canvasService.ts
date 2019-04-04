import { base64ToImgElement } from './utils';

class CanvasServiceSrc {
  readonly canvas         = document.createElement('canvas');
  readonly canvasCtx      = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  readonly helperCanvas    = document.createElement('canvas');
  readonly helperCanvasCtx = this.helperCanvas.getContext('2d') as CanvasRenderingContext2D;

  constructor() {
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
}

export const canvasService = new CanvasServiceSrc();
