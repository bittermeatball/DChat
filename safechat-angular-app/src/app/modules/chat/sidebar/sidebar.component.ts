import { Component, OnInit } from '@angular/core';

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
  PANEL = PANEL
  activePanel = PANEL.CONVERSATION

  constructor() { }

  ngOnInit(): void {
  }

}
