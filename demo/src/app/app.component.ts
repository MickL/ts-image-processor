import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  fileToBase64,
  resize,
  sharpen,
  rotate,
  mirror,
  output,
  imageProcessor,
  applyExifOrientation,
  noop,
} from '../../../build/main';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  srcBase64: string;
  srcFile: File;

  applyExifOrientation: boolean;
  resizeImgResult: string;
  resizeIsProcessing: boolean;
  resizeProcessingTime: number;
  rotateImgResult: string;
  rotateIsProcessing: boolean;
  rotateProcessingTime: number;

  onFileInputChange(file: File) {
    this.fileInput.nativeElement.value = '';
    this.clear();
    this.srcFile = file;
    this.showSource();
  }

  showSource() {
    fileToBase64(this.srcFile).then(base64 => {
      imageProcessor
        .src(base64)
        .pipe(
          this.applyExifOrientation ? applyExifOrientation() : noop(),
        )
        .then(result => {
          this.srcBase64 = result;
        });
    });
  }

  applyExifOrientationChanged(checked: boolean) {
    this.applyExifOrientation = checked;
    if (this.srcBase64) {
      this.clear();
      this.showSource();
    }
  }

  clear() {
    this.srcBase64       = null;
    // this.srcFile         = null;
    this.resizeImgResult = null;
    this.rotateImgResult = null;
  }

  onResize(maxWidth: string, maxHeight: string, sharpness: string) {
    if (!maxWidth || !maxHeight || !sharpness) {
      return;
    }

    this.resizeIsProcessing = true;
    const t0                = performance.now();

    imageProcessor
      .src(this.srcBase64)
      .pipe(
        resize({
          maxWidth:  +maxWidth,
          maxHeight: +maxHeight,
        }),
        sharpen({
          sharpness: +sharpness,
        }),
        output(),
      ).then(resultBase64 => {
        const t1                  = performance.now();
        this.resizeProcessingTime = Math.round((t1 - t0) * 100) / 100;
        this.resizeIsProcessing   = false;
        this.resizeImgResult      = resultBase64;
      },
    )
    ;
  }

  onRotate() {
    const t0 = performance.now();

    imageProcessor
      .src(this.rotateImgResult)
      .pipe(
        rotate(),
        output(),
      )
      .then(base64 => {
        const t1 = performance.now();
        this.rotateProcessingTime = Math.round((t1 - t0) * 100) / 100;
        this.rotateImgResult = base64;
      })
    ;
  }

  onMirror() {
    const t0 = performance.now();

    imageProcessor
      .src(this.rotateImgResult)
      .pipe(
        mirror(),
        output(),
      )
      .then(base64 => {
        const t1 = performance.now();
        this.rotateProcessingTime = Math.round((t1 - t0) * 100) / 100;
        this.rotateImgResult = base64;
      })
    ;
  }

  ngOnInit() {
  }
}
