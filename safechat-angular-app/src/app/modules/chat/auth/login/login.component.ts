import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter<{ username: string }>()

  username: string = ''

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.login.emit({ username: this.username })
    this.dialogRef.close()
  }

}
