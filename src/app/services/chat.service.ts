import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, orderBy, query, collectionData } from '@angular/fire/firestore';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
 uid: string;
 email: string;
}

export interface Message {
 createdAt: import('firebase/firestore').Timestamp;
 id: string;
 from: string;
 msg: string;
 fromName: string;
 myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  addChatMessage(msg: string) {
    return addDoc(collection(this.firestore, 'messages'), {
      msg,
      from: 'Usuario',
      createdAt: serverTimestamp(),
      fromName: 'Usuario'
    });
  }

  getChatMessages(): Observable<Message[]> {
    const messagesRef = collection(this.firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }
}
