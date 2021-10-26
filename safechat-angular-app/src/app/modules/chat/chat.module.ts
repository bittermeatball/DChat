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
import { FormsModule } from '@angular/forms';


import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ContactDialogComponent } from './sidebar/contact-dialog/contact-dialog.component';

@NgModule({
  declarations: [
    ChatComponent,
    NavbarComponent,
    SidebarComponent,
    ChatboxComponent,
    ContactDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatSidenavModule,
    MatRippleModule,
    MatDialogModule,
  ]
})
export class ChatModule { }
