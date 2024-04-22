import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAgjGU6qiFPXfHYCj0pj7d7mPEz_HtmJq4',
  authDomain: 'ss-planner.firebaseapp.com',
  projectId: 'ss-planner',
  storageBucket: 'ss-planner.appspot.com',
  messagingSenderId: '504552839260',
  appId: '1:504552839260:web:62eb997f0a5eea238bae99',
  measurementId: 'G-9MK7NRGH6L',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
