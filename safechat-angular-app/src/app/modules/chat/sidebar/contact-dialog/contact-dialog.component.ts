import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auth } from 'src/app/core/models/auth.model';
import { Utils } from 'src/app/core/utils';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
  @Output() onChat = new EventEmitter<Auth>();

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contact: Auth }
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  contactShortenId = () => Utils.shortenToken(this.data.contact?.id || '')

  handleClickChat() {
    this.onChat.emit(this.data.contact)
    this.dialogRef.close()
  }

  handleClickCopyCode() {
    Utils.copyToClipboard(this.data.contact?.id)
  }
}
