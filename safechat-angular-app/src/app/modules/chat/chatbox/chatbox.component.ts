import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @ViewChild('textareaElement') textareaElement?: ElementRef<HTMLTextAreaElement>

  textareaHeight = '3.5rem'
  textareaValue: string | null = ''

  constructor() { }

  ngOnInit(): void {
  }

  handleInputTextarea($event : any) {
    const _el = this.textareaElement?.nativeElement

    this.textareaValue = $event.target?.value

    this.textareaHeight = 'auto'
    this.textareaHeight = this.textareaValue ? (_el?.scrollHeight || 0) + 'px' : '3.5rem'
  }

}
