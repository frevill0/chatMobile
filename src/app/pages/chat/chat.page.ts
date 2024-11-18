import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  messages!: Observable<any[]>;
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage(){
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
  }

  async sendLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Crear URL de Google Maps
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      // Enviar el mensaje con la ubicación
      this.chatService.addChatMessage(locationUrl).then(() => {
        this.content.scrollToBottom();
      });
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }

  async openLink(url: string) {
    try {
      // Abrir el enlace en el navegador predeterminado
      await Browser.open({ url });
    } catch (error) {
      console.error('Error abriendo el navegador:', error);
    }
  }
  
  isHyperlink(message: string): boolean {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(message);
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
