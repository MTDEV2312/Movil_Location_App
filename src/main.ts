import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routes } from './app/app.routes';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app';
import {provideFirestore,getFirestore} from '@angular/fire/firestore'
import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom } from '@angular/core';



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes,),
    provideFirebaseApp(() => 
      initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()), 

  ],
});