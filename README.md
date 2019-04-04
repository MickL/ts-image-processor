# TypeScript image processor

This library provides basic image processing functions for use in TypeScript or Angular projects.
 
Available functions:
- resize
- sharpen
- resizeAndSharpen
- rotate
- mirror

_I recommend to always use `resizeAndSharpen` instead of `resize` - that's what Photoshop does, too ;)_

Advantages:
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
import { getBlobForFile, resizeAndSharpen } from 'ts-image-processor';

// Optionally convert File-object to blob (base64-string), e.g. if you have a file from <input>
getBlobForFile(file).then(blob => {
  // Use any of the functions with an existing blob (base64-string)
  resizeAndSharpen(blob, {
    width: 500,
    height: 500,
  })
  .then(resultBlob => {
    // Upload, display, etc.
  });
});
```

### Contribute 
Feel free to create pull requests

### Todo's
- [ ] Cleanup files/folders + tslint
- [ ] Operations should be pipable
- [ ] Accept blob OR file for all functions
- [ ] Accept multiple blob's / file's
- [ ] Use Web Workers
- [ ] Write advanced documentation with included [typedoc](https://typedoc.org/)
