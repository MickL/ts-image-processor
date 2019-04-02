class CanvasServiceSrc {
  readonly canvas         = document.createElement('canvas');
  readonly canvasCtx      = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  private helperCanvas    = document.createElement('canvas');
  private helperCanvasCtx = this.helperCanvas.getContext('2d') as CanvasRenderingContext2D;

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
      let img: any = document.createElement('img');

      img.onload = () => {
        this.canvas.width  = img.naturalWidth || img.width;
        this.canvas.height = img.naturalHeight || img.height;
        this.canvasCtx.drawImage(img as HTMLImageElement, 0, 0);
        img = null;
        resolve();
      };

      img.src = blob;
    });
  }

  setSize(width: number, height: number) {
    this.canvas.width  = width;
    this.canvas.height = height;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getDataUrl(type?: string, quality?: any): string {
    return this.canvas.toDataURL(type, quality);
  }

  getCropDataUrl(width: number, height: number, type?: string, quality?: any): string {
    this.helperCanvas.width  = width;
    this.helperCanvas.height = height;
    this.helperCanvasCtx.drawImage(this.canvas, 0, 0, width, height, 0, 0, width, height);
    return this.helperCanvas.toDataURL(type, quality);
  }
}

export const CanvasService = new CanvasServiceSrc();
