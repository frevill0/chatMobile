import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, setDoc, Firestore, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  email: string | null;
}

export interface Message {
  createdAt: Timestamp; // Firestore timestamp
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
  currentUser: User | null = null;
  private auth = getAuth();
  private firestore: Firestore = getFirestore();

  constructor() {
    onAuthStateChanged(this.auth, (user: FirebaseUser | null) => {
      console.log('Auth state changed: ', user);
      this.currentUser = user ? { uid: user.uid, email: user.email } : null;
    });
  }

  async signUp({ email, password }: { email: string, password: string }) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log('Sign up result: ', credential);

    if (credential.user) {
      const uid = credential.user.uid;
      await setDoc(doc(this.firestore, `users/${uid}`), {
        uid,
        email: credential.user.email,
      });
    } else {
      throw new Error('User credential is null');
    }
  }

  async signIn({ email, password }: { email: string, password: string }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    return signOut(this.auth);
  }

  async addChatMessage(msg: string) {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    const messagesCollection = collection(this.firestore, 'messages');
    await addDoc(messagesCollection, {
      msg,
      from: this.currentUser.uid,
      createdAt: Timestamp.now(),
    });
  }

  getChatMessages(): Observable<Message[]> {
    const messagesCollection = collection(this.firestore, 'messages');
    const messagesQuery = query(messagesCollection, orderBy('createdAt'));

    return new Observable<Message[]>(subscriber => {
      onSnapshot(messagesQuery, snapshot => {
        const messages: Message[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as Message;
          data.id = doc.id;
          data.myMsg = this.currentUser ? data.from === this.currentUser.uid : false;
          messages.push(data);
        });
        subscriber.next(messages);
      });
    });
  }

  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    return new Observable<User[]>(subscriber => {
      onSnapshot(usersCollection, snapshot => {
        const users: User[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            uid: doc.id,
            email: typeof data['email'] === 'string' ? data['email'] : 'No Email',
          };
        });
        subscriber.next(users);
      });
    });
  }

  getUserForMsg(msgFromId: string, users: User[]): string {
    const user = users.find(usr => usr.uid === msgFromId);
    return user ? user.email || 'No Email' : 'Deleted';
  }
}
