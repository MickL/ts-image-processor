export interface ResizeOptions {
  maxWidth: number;
  maxHeight: number;
}

export interface OutputOptions {
  jpgQuality?: number;
  type?: string;
}

export interface BlobImageData {
  width: number;
  height: number;
  element: HTMLImageElement;
}
