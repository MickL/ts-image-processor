# TypeScript image processor

This library provides basic image processing functions for use in TypeScript or Angular projects.
 
Available processing functions:
- applyExifOrientation
- resize
- sharpen
- rotate
- mirror
- noop
- output

_For best results I recommend to always use `sharpen` after `resize` - that's what Photoshop does, too ;)_

Available File/HTMLImageElement utility functions:
- fileToBase64
- fileToArrayBuffer
- base64ToImgElement
- base64ToArrayBuffer


## Advantages
- Smooth resizing of images in multiple resize-steps
- Prevents error on iOS `Total canvas memory use exceeds the maximum limit`  by using only one canvas for everything
- Tree shakable - if you use a bundler like Webpack it will not include unused functions in your project

## Demo
See the demo [here](https://www.lawitzke.com/dev/typescript-image-processor/)

## Usage
```
npm i ts-image-processor -S
```

```
import { getBlobForFile, imageProcessor, resize, sharpen, output } from 'ts-image-processor';

// If you have a file from <input>, convert it to base64-string first
getBlobForFile(file).then(base64 => {
  // Use any of the functions with an existing blob (base64-string)
  imageProcessor
    .src(base64)
    .pipe(
      resize({maxWidth: 800, maxHeight: 800}),
      sharpen(),
      output(),
    )
    .then(processedBase64 => {
      // Do whatever with your happy result :)
    });
});
```

### Contribute 
Feel free to create pull requests

### Todo's
- [ ] Cleanup files/folders + tslint
- [ ] `imageProcessor.src()` should handle wrong input
- [ ] `imageProcessor.src()` should accept `File` 
- [ ] `imageProcessor.src()` should accept `FileList`
- [ ] `imageProcessor.src()` should accept `File[]`
- [ ] `imageProcessor.src()` should accept `string[]` (base64-array)
- [ ] `rotate()` should provide more options than just 90° rotation
- [ ] Process everything within a Web Worker
- [ ] Write advanced documentation with included [typedoc](https://typedoc.org/)
