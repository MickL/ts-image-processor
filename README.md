# TypeScript image processor

This library provides basic image processing functions for use in TypeScript or Angular projects.

This module is tree shakable so if you need only one of the functions, Webpack will not bundle the other, unused functions in your project. 

Available functions:
- resize
- sharpen
- resizeAndSharpen
- rotate
- mirror

_I recommend to always use `resizeAndSharpen` instead of `resize`_

## Demo
See the demo [here](https://www.lawitzke.com/dev/typescript-image-processor/)

## Usage
```
npm i ts-image-processor -S
```


```
import { getBlobForFile, resizeAndSharpen } from 'ts-image-processor';

// Convert file-object(e.g. from input) to blob (base64-string)
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
- [ ] Write documentation with included [typedoc](https://typedoc.org/)
