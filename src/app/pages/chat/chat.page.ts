import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
@Component({
 selector: 'app-chat',
 templateUrl: './chat.page.html',
 styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
 @ViewChild(IonContent) content!: IonContent;
 messages!: Observable<any[]>;
 newMsg: string = '';

 constructor(private chatService: ChatService) {}

 ngOnInit() {
   this.messages = this.chatService.getChatMessages();
 }

 sendMessage() {
   if (this.newMsg.trim()) {
     this.chatService.addChatMessage(this.newMsg).then(() => {
       this.newMsg = '';
       this.content.scrollToBottom();
     });
   }
 }
}