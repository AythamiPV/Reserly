import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc } from 'firebase/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { environment } from '../environments/environment'; // Ajusta la ruta


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore(app);
  }

  async createUser(userData: any): Promise<void> {
    try {
      const usersCollection = collection(this.firestore, 'Users');
      await addDoc(usersCollection, userData);
      console.log('Usuario creado con ID: ');
    } catch (error) {
      console.error('Error al añadir documento: ', error);
      throw error;
    }
  }
}
