import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ContactDialogComponent } from './sidebar/contact-dialog/contact-dialog.component';
import { LoginComponent } from './auth/login/login.component';


import { ChatService } from 'src/app/services/chat.service';
import { AddContactDialogComponent } from './sidebar/add-contact-dialog/add-contact-dialog.component';
import { environment } from 'src/environments/environment';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

@NgModule({
  declarations: [
    ChatComponent,
    NavbarComponent,
    SidebarComponent,
    ChatboxComponent,
    ContactDialogComponent,
    AddContactDialogComponent,
    LoginComponent,
    VideoDialogComponent,
  ],
  entryComponents: [
    ContactDialogComponent,
    AddContactDialogComponent,
    LoginComponent,
    VideoDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSidenavModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'} },
    { provide: "PEER_HOST", useValue: environment.peerHost },
    { provide: "PEER_PORT", useValue: environment.peerPort },
    ChatService,
  ]
})
export class ChatModule { }
