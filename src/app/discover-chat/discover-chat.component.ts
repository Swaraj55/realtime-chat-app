import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DiscoverChatService } from '../discover-chat/discover-chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover-chat',
  templateUrl: './discover-chat.component.html',
  styleUrls: ['./discover-chat.component.scss']
})
export class DiscoverChatComponent implements OnInit {

  userStuffs = JSON.parse(localStorage.getItem('user'));
  messages: string[] = [];
  chatMessage: FormGroup = new FormGroup({});
  users: any[] = [];

  @ViewChild('updateTextField')  updateTextField: NgForm

  constructor(private element: ElementRef,
              private discoverChatService: DiscoverChatService,
              private formBuilder:FormBuilder,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.joinRoom();
    this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#FFDAB9';

    this.chatMessage = this.formBuilder.group({
      message: ['']
    })

    this.discoverChatService.getMessage().subscribe((msg: any) => {
     this.messages.push(msg);  
     var container = document.querySelector('.messenger-color');

     //Scoll Down --> It's mean that every new messages it automatically bring us down
     container.scrollTop = container.scrollHeight;
    });

    this.discoverChatService.getRoomAndUserInfo().subscribe((data: any) => {
      console.log(data.users)
      this.users = data.users
    })
  }


  sendMsg(){
    let payloadMessage = {
      message:this.chatMessage.controls['message'].value 
    }
    this.discoverChatService.sendMessage(payloadMessage.message);
    this.updateTextField.resetForm({});
  }

  joinRoom() {
    let payloadMessage = {
      username: this.userStuffs.name,
      room:this.userStuffs.room
    }
    this.discoverChatService.sendMessageToRoom(payloadMessage.username, payloadMessage.room);
  }

  leaveRoom() {
    this.router.navigate(['/'])
  }
}
