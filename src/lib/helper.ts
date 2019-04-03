import { BlobImageData } from './models';

export function getBlobForFile(file: File): Promise<string> {
  return new Promise<string>(resolve => {
    let reader: any = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as string);
      reader = null;
    });

    reader.readAsDataURL(file);
  });
}

export function getImageForBlob(blob: string): Promise<BlobImageData> {
  return new Promise<BlobImageData>(resolve => {
    const img = document.createElement('img');

    img.onload = () => {
      resolve({
        element: img,
        height:  img.naturalHeight || img.height,
        width:   img.naturalWidth || img.width,
      });
    };

    img.src = blob;
  });
}
