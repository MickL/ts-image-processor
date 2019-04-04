export interface ResizeOptions {
  maxWidth: number;
  maxHeight: number;
}

export interface SharpenOptions {
  sharpness?: number;
}

export interface OutputOptions {
  jpgQuality?: number;
  type?: string;
}

export interface Base64ImageData {
  width: number;
  height: number;
  imgElement: HTMLImageElement;
}

export interface OperatorFunction {
  (base64: string): Promise<string>;
}

export interface SrcOptions {
  applyExifOrientation?: boolean;
}
