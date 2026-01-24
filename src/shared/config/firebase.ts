import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics only if supported (not in Node.js environment)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// For development: Connect to emulators if running locally
if (process.env.EXPO_PUBLIC_APP_ENV === 'development') {
  // Uncomment these when you want to use Firebase emulators
  // import { connectAuthEmulator } from 'firebase/auth';
  // import { connectFirestoreEmulator } from 'firebase/firestore';
  // import { connectFunctionsEmulator } from 'firebase/functions';
  // import { connectStorageEmulator } from 'firebase/storage';
  
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectFunctionsEmulator(functions, 'localhost', 5001);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export default app;
