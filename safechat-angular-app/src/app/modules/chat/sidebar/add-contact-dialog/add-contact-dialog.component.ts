import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss']
})
export class AddContactDialogComponent implements OnInit {
  userId: string = ''
  username: string = ''
  @Output() onAddContact = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddContactDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  handleAddContact(): void {
    this.onAddContact.emit({ userId: this.userId, username: this.username })
    this.dialogRef.close()
  }

}
