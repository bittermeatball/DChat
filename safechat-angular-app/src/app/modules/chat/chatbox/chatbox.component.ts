import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @Input() conversation: Conversation | null = null

  @ViewChild('textareaElement') textareaElement?: ElementRef<HTMLTextAreaElement>

  textareaHeight = '3.5rem'
  textareaValue: string | null = ''
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

  handleInputTextarea($event : any) {
    const _el = this.textareaElement?.nativeElement

    this.textareaValue = $event.target?.value

    this.textareaHeight = 'auto'
    this.textareaHeight = this.textareaValue ? (_el?.scrollHeight || 0) + 'px' : '3.5rem'
  }

}
