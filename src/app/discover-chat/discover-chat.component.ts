import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-chat',
  templateUrl: './discover-chat.component.html',
  styleUrls: ['./discover-chat.component.scss']
})
export class DiscoverChatComponent implements OnInit {

  roomName = JSON.parse(localStorage.getItem('user'));

  users = ['swaraj', 'pawan', 'saurabh', 'aman'];
  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#FFDAB9';
  }

}
