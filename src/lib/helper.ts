export function getBlobForFile(file: File): Promise<string> {
  return new Promise<string>(resolve => {
    let reader: any = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as string);
      reader = null;
    });

    reader.readAsDataURL(file);
  })
}
