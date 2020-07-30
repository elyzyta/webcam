import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Webcam from 'webcamjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  snapshots: any[] = [];

  constructor() { }

  ngOnInit() {
    this.activateWebCam();
  }

  ngOnDestroy(): void {
    Webcam.reset();
  }

  async activateWebCam() {
    Webcam.set({
      width: 640,
      height: 480,
      // dest_width: 1610,
      // dest_height: 1200,
      image_format: 'jpeg',
      jpeg_quality: 100,
    });
    Webcam.attach('#camara');
  }

  triggerSnapshot(): void {
    const canvas = document.getElementById('canvasPhoto') as HTMLCanvasElement;
    const video = Webcam.container.childNodes[1];

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    this.setImages(canvas.toDataURL('image/jpeg'));
  }

  setImages(img) {
    const snapshot = img.slice(23);
    this.snapshots.push(snapshot);
  }

  remove(e: any, i: any): void {
    e.preventDefault();
    this.snapshots.splice(i, 1);
  }
}
