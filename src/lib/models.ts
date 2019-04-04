export interface ResizeOptions {
  maxWidth: number;
  maxHeight: number;
}

export interface SharpenOptions {
  sharpness: number;
  onlyWhenResizedPrct?: number;
}

export interface OutputOptions {
  jpgQuality?: number;
  type?: string;
}

export interface Base64ImageData {
  width: number;
  height: number;
  element: HTMLImageElement;
}
