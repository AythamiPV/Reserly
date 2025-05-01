import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../environments/environment'; // Ajusta la ruta

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.firestore = getFirestore(app);
  }

  async createUser(userData: any): Promise<void> {
    try {
      const usersCollection = collection(this.firestore, 'Users');
      await addDoc(usersCollection, userData);
      console.log('Usuario creado con ID: ', (await addDoc(usersCollection, userData)).id);
    } catch (error) {
      console.error('Error al añadir documento: ', error);
      throw error;
    }
  }
}
