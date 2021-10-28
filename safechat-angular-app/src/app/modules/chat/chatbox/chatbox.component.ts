import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
import { Utils } from 'src/app/core/utils';
import { ChatService } from 'src/app/services/chat.service';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @Output() submitMessage = new EventEmitter<Message>()
  @Input() conversation: Conversation | null = null

  @ViewChild('textareaElement') textareaElement?: ElementRef<HTMLTextAreaElement>
  @ViewChild('chatboxDrawerRef') chatboxDrawerRef?: ElementRef

  textareaHeight = '3.5rem'
  textareaValue: string | null = null
  currentUser: Auth | null = null
  isChatboxDrawerOpened = true

  constructor(
    private store: Store<{ auth: AuthState }>,
    private chatService: ChatService,
    private dialog: MatDialog,
  ) {
    this.store.pipe(select(selectCurrentUser)).subscribe(currentUser => {
      this.currentUser = currentUser
    })
  }

  ngOnInit(): void {
  }

  conversationShortenId = () => Utils.shortenToken(this.conversation?.id || '')

  private _resizeTextarea() {
    const _el = this.textareaElement?.nativeElement

    this.textareaHeight = 'auto'
    this.textareaHeight = this.textareaValue ? (_el?.scrollHeight || 0) + 'px' : '3.5rem'
  }

  private _clearTextarea() {
    this.textareaValue = ''
    this._resizeTextarea()
  }

  handleToggleDrawer() {
    this.isChatboxDrawerOpened = !this.isChatboxDrawerOpened
  }

  handleClickCopyCode() {
    Utils.copyToClipboard(this.conversation?.id)
  }

  handleInputTextarea() {
    this._resizeTextarea()
  }

  handleEnterTextarea($event: any) {
    $event.preventDefault()

    this.handleSubmitMessage()
    this._clearTextarea()
  }

  handleSubmitMessage() {
    if (this.textareaValue) {
      this.submitMessage.emit({
        sender: this.currentUser,
        message: this.textareaValue,
        createdAt: new Date()
      })
      this._clearTextarea()
    }
  }

  startVideoCall() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(selfStream => {
        const videoDialogRef = this.dialog.open(VideoDialogComponent, {
          height: '400px',
          width: '600px',
        });

        videoDialogRef.componentInstance.attachStreamToLocal(selfStream);
        const peer = this.chatService.getPeer();
        if (peer) {
          const call = peer.call((this.conversation as Conversation).id, selfStream);
          call.on('stream', function (remoteStream) {
            videoDialogRef.componentInstance.attachStreamToRemote(remoteStream)
          });
        }
      })
      .catch(error => {
        console.log("Error during starting call")
        console.log(error)
      })
    console.log("Starting video call")
  }

}
