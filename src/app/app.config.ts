import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
// import { firebaseConfig } from '../environments/environment';

import { routes } from './app.routes';
import { InjectionToken } from '@angular/core';
export const WINDOW = new InjectionToken<Window>('Window');

// Read values injected from .env at build time (Vite/DefinePlugin). Ensure your .env uses VITE_... keys.
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = (import.meta as any).env;

export const firebaseConfig = {
  apiKey: String(VITE_FIREBASE_API_KEY),
  authDomain: String(VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(VITE_FIREBASE_APP_ID),
  measurementId: String(VITE_FIREBASE_MEASUREMENT_ID),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), // Provide Firebase Auth
    {provide : WINDOW, useValue: window},
  ],
};
