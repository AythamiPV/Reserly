import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Mantén esta línea si tienes un archivo app.config
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { environment } from './environments/environment';
// import { provideStorage, getStorage } from '@angular/fire/storage'; // Importa si usas Storage
// import { provideFunctions, getFunctions } from '@angular/fire/functions'; // Importa si usas Functions
// import { provideMessaging, getMessaging } from '@angular/fire/messaging'; // Importa si usas Messaging
// import { FirebaseService } from './app/firebase.service'; // Asegúrate de importar tu servicio si lo tienes

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    // FirebaseService, // Asegúrate de incluir tu servicio si lo tienes
    // provideStorage(() => getStorage()), // Incluye si usas Storage
    // provideFunctions(() => getFunctions()), // Incluye si usas Functions
    // provideMessaging(() => getMessaging()), // Incluye si usas Messaging
    // ... otros providers de tu aplicación
  ],
})
  .catch((err) => console.error(err));
