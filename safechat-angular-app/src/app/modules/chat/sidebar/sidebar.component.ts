import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

enum PANEL {
  CONVERSATION = 'CONVERSATION',
  CONTACTS = 'CONTACTS',
  SHARING = 'SHARING',
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() onSelectConversation = new EventEmitter<Conversation>();
  @Output() onCreateConversation = new EventEmitter<Conversation>();

  @Output() onAddConversation = new EventEmitter<Conversation>();
  @Output() onAddContact = new EventEmitter<Auth>();

  @Input() conversations: Conversation[] = [];
  @Input() contacts: Auth[] = [];

  private _baseUrl: string;

  PANEL = PANEL
  activePanel = PANEL.CONVERSATION

  currentUser: Auth | null = null

  constructor(
    private store: Store<{ auth: AuthState }>,
    private http: HttpClient,
    public dialog: MatDialog,
    @Inject('API_URL') baseUrl: string = '',
  ) {
    this._baseUrl = baseUrl;
    this.store.pipe(select(selectCurrentUser)).subscribe(currentUser => {
      this.currentUser = currentUser
    })
  }

  ngOnInit(): void {
  }

  handleSelectConversation(conversation: Conversation): void {
    this.onSelectConversation.emit(conversation);
  }

  handleAddConversation(contact: Auth) {
    const _user = this.currentUser as Auth
    const _conversation = {
      id: contact.id,
      title: `Conversation with ${contact.username}`,
      thumbnail: contact.avatar,
      contacts: [_user, contact],
      messages: [],
      images: [],
      files: [],
    }

    this.onAddConversation.emit(_conversation);
    this.onSelectConversation.emit(_conversation);
  }

  handleAddContact(userToken: string, username: string) {
    const _addContact = (payload: any) => {
      const _contact = {
        id: userToken || payload.data.publicToken,
        username: payload.data.username || payload.data.publicToken || userToken,
        avatar: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
      }

      this.handleAddConversation(_contact);
      this.onAddContact.emit(_contact);
    }

    if (username) {
      this.http.get(`${this._baseUrl}/account`, {
        params: {
          s: username,
        },
        headers: {
          'own-public-key': this.currentUser?.id as string,
        }
      }).subscribe((payload: any) => _addContact(payload))
    } else if (userToken) {
      this.http.get(`${this._baseUrl}/account/${userToken}`).subscribe((payload: any) => _addContact(payload))
    }
  }

  handleSelectContact(contact: Auth): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '320px',
      data: { contact }
    });

    dialogRef.componentInstance.onChat.subscribe((contact: Auth) => {
      this.handleAddConversation(contact)
    })
  }

  handleShowContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      width: '320px',
      data: {}
    });

    dialogRef.componentInstance.onAddContact.subscribe(({ userId, username }) => {
      this.handleAddContact(userId, username)
    })
  }

}
