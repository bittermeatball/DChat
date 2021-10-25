import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @Output() submitMessage = new EventEmitter<Message>()
  @Input() conversation: Conversation | null = null

  @ViewChild('textareaElement') textareaElement?: ElementRef<HTMLTextAreaElement>

  textareaHeight = '3.5rem'
  textareaValue: string | null = null
  currentUser: Auth | null = null

  constructor(
    private store: Store<{ auth: AuthState }>
  ) {
    this.store.pipe(select(selectCurrentUser)).subscribe(currentUser => {
      this.currentUser = currentUser
    })
  }

  ngOnInit(): void {
  }

  conversationShortenId = () => this.conversation?.id?.slice(0, 4) + "..." +
    this.conversation?.id?.slice(
      (this.conversation?.id?.length || 0) - 4,
      this.conversation?.id?.length
    )

  private _resizeTextarea() {
    const _el = this.textareaElement?.nativeElement

    this.textareaHeight = 'auto'
    this.textareaHeight = this.textareaValue ? (_el?.scrollHeight || 0) + 'px' : '3.5rem'
  }

  private _clearTextarea() {
    this.textareaValue = ''
    this._resizeTextarea()
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
    this.submitMessage.emit({
      sender: this.currentUser,
      message: this.textareaValue,
      createdAt: new Date()
    })
    this._clearTextarea()
  }

}
