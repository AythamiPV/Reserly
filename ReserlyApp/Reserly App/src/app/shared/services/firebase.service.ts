// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { addDoc } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
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

  async setDocument(
    collectionName: string,
    docId: string,
    data: any
  ): Promise<void> {
    try {
      await setDoc(this.docRef(collectionName, docId), data);
      console.log('Documento escrito con ID: ', docId);
    } catch (error) {
      console.error('Error al añadir/actualizar documento: ', error);
      throw error;
    }
  }

  async getDocument(collectionName: string, docId: string): Promise<any> {
    const docRef = this.docRef(collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
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
      onSnapshot(
        this.collectionRef(collectionName),
        (snapshot) => {
          const data: T[] = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as T)
          );
          subscriber.next(data);
        },
        (error) => {
          subscriber.error(error);
        }
      );
    });
  }

  getDocumentData<T>(
    collectionName: string,
    docId: string
  ): Observable<T | undefined> {
    return new Observable((subscriber) => {
      onSnapshot(
        this.docRef(collectionName, docId),
        (snapshot) => {
          const data = snapshot.data() as T | undefined;
          subscriber.next(data ? { id: snapshot.id, ...data } : undefined);
        },
        (error) => {
          subscriber.error(error);
        }
      );
    });
  }

  /**
   * Registra un nuevo usuario con email y contraseña.
   * @param email El email del nuevo usuario.
   * @param password La contraseña del nuevo usuario.
   * @returns Una promesa con la información del usuario creado.
   */
  registerUser(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => userCredential.user
    );
  }

  /**
   * Inicia sesión de un usuario existente con email y contraseña.
   * @param email El email del usuario.
   * @param password La contraseña del usuario.
   * @returns Una promesa con la información del usuario autenticado.
   */
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => userCredential.user)
      .catch((error) => {
        console.error('Error signing in with email and password:', error);
        throw error;
      });
  }

  getUserData(uid: string): Observable<any> {
    if (!uid) {
      return of(undefined); // Devuelve un observable vacío si no hay UID
    }
    const userDocRef = doc(this.db, 'Users', uid);
    return from(getDoc(userDocRef)).pipe(
      switchMap((docSnapshot) => {
        if (docSnapshot.exists()) {
          return of(docSnapshot.data());
        } else {
          return of(undefined);
        }
      })
    );
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

  async createUser(userData: any, uid: string): Promise<void> {
    // Modificado para aceptar uid
    try {
      const userDocRef = doc(this.db, 'Users', uid); // Usa docRef con el uid
      await setDoc(userDocRef, userData); // Usa setDoc para especificar el ID
      console.log('Usuario creado con ID: ', uid);
    } catch (error) {
      console.error('Error al añadir documento: ', error);
      throw error;
    }
  }
}
