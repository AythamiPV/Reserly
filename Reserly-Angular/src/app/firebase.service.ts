// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);
  private auth = getAuth(this.app);

  // Observable para rastrear el estado de autenticación del usuario
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    // Escucha los cambios en el estado de autenticación
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  // **Firestore CRUD Operations (sin cambios)**
  collectionRef(collectionName: string) {
    return collection(this.db, collectionName);
  }

  docRef(collectionName: string, docId: string) {
    return doc(this.db, collectionName, docId);
  }

  addDocument(collectionName: string, data: any) {
    return addDoc(this.collectionRef(collectionName), data);
  }

  updateDocument(collectionName: string, docId: string, data: any) {
    return updateDoc(this.docRef(collectionName, docId), data);
  }

  deleteDocument(collectionName: string, docId: string) {
    return deleteDoc(this.docRef(collectionName, docId));
  }

  getCollectionData<T>(collectionName: string): Observable<T[]> {
    return new Observable((subscriber) => {
      onSnapshot(this.collectionRef(collectionName), (snapshot) => {
        const data: T[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        subscriber.next(data);
      }, (error) => {
        subscriber.error(error);
      });
    });
  }

  getDocumentData<T>(collectionName: string, docId: string): Observable<T | undefined> {
    return new Observable((subscriber) => {
      onSnapshot(this.docRef(collectionName, docId), (snapshot) => {
        const data = snapshot.data() as T | undefined;
        subscriber.next(data ? { id: snapshot.id, ...data } : undefined);
      }, (error) => {
        subscriber.error(error);
      });
    });
  }

  // **Firebase Authentication Operations**

  /**
   * Registra un nuevo usuario con email y contraseña.
   * @param email El email del nuevo usuario.
   * @param password La contraseña del nuevo usuario.
   * @returns Una promesa con la información del usuario creado.
   */
  registerUser(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => userCredential.user);
  }

  /**
   * Inicia sesión de un usuario existente con email y contraseña.
   * @param email El email del usuario.
   * @param password La contraseña del usuario.
   * @returns Una promesa con la información del usuario autenticado.
   */
  loginUser(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => userCredential.user);
  }

  /**
   * Cierra la sesión del usuario actual.
   * @returns Una promesa que se resuelve cuando la sesión se cierra.
   */
  logoutUser(): Promise<void> {
    return signOut(this.auth);
  }

  /**
   * Obtiene el estado de autenticación actual del usuario (de forma síncrona).
   * @returns El objeto User si el usuario está autenticado, o null si no lo está.
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
