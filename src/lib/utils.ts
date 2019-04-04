import EXIF = require('exif-js/exif');
import { Base64ImageData } from './models';

export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>(resolve => {
    console.log(EXIF.readFromBinaryFile(file));

    let reader: any = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as string);
      reader = null;
    });

    reader.readAsDataURL(file);
  });
}

export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>(resolve => {
    let reader: any = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as ArrayBuffer);
      reader = null;
    });

    reader.readAsArrayBuffer(file);
  });
}

export function base64ToImgElement(base64: string): Promise<Base64ImageData> {
  return new Promise<Base64ImageData>(resolve => {
    const img = document.createElement('img');

    img.onload = () => {
      resolve({
        element: img,
        height:  img.naturalHeight || img.height,
        width:   img.naturalWidth || img.width,
      });
    };

    img.src = base64;
  });
}

export function base64ToArrayBuffer(base64: string) {
  base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
