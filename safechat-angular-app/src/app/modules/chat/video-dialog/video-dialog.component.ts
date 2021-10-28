import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {
  public sourceLocalVideo: any;

  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  attachStreamToLocal(stream: MediaProvider ) {
    (document.getElementById('local-video') as HTMLVideoElement).srcObject  = stream;
  }

  attachStreamToRemote(stream: MediaProvider ) {
    (document.getElementById('remote-video') as HTMLVideoElement).srcObject  = stream;
  }

}
