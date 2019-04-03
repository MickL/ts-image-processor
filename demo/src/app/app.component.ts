import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getBlobForFile, mirror, resizeAndSharpen, rotate } from 'ts-image-processor';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  imgSource: string;
  resizeImgResult: string;
  resizeIsLoading: boolean;
  resizeProcessingTime: number;
  rotateImgResult: string;
  rotateIsLoading: boolean;
  rotateProcessingTime: number;

  onFileInputChange(file: File) {
    this.fileInput.nativeElement.value = '';
    this.clear();

    getBlobForFile(file).then(blob => {
      this.imgSource = blob;
    });
  }

  clear() {
    this.imgSource       = null;
    this.resizeImgResult = null;
    this.rotateImgResult = null;
  }

  onResize(maxWidth: string, maxHeight: string, sharpness: string) {
    if (!maxWidth || !maxHeight || !sharpness) {
      return;
    }

    this.resizeIsLoading = true;
    const t0 = performance.now();

    resizeAndSharpen(
      this.imgSource,
      {
        maxWidth:  +maxWidth,
        maxHeight: +maxHeight,
      },
      {
        sharpness: +sharpness,
      },
    ).then(resultBlob => {
      const t1                  = performance.now();
      this.resizeProcessingTime = Math.round((t1 - t0) * 100) / 100;
      this.resizeIsLoading      = false;
      this.resizeImgResult      = resultBlob;
    });
  }

  onRotate() {
    const t0 = performance.now();

    rotate(this.rotateImgResult).then(blob => {
      const t1 = performance.now();
      this.rotateProcessingTime = Math.round((t1 - t0) * 100) / 100;
      this.rotateImgResult = blob;
    });
  }

  onMirror() {
    const t0 = performance.now();

    mirror(this.rotateImgResult).then(blob => {
      const t1 = performance.now();
      this.rotateProcessingTime = Math.round((t1 - t0) * 100) / 100;
      this.rotateImgResult = blob;
    });
  }

  ngOnInit() {
  }
}
