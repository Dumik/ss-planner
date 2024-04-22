// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAgjGU6qiFPXfHYCj0pj7d7mPEz_HtmJq4',
  authDomain: 'ss-planner.firebaseapp.com',
  projectId: 'ss-planner',
  storageBucket: 'ss-planner.appspot.com',
  messagingSenderId: '504552839260',
  appId: '1:504552839260:web:62eb997f0a5eea238bae99',
  measurementId: 'G-9MK7NRGH6L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
