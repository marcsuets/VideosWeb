import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDAKQpMTfX0SSe_6s16ZkBCjPFz7SHuPSI",
    authDomain: "videoplayer-fb6c7.firebaseapp.com",
    projectId: "videoplayer-fb6c7",
    storageBucket: "videoplayer-fb6c7.firebasestorage.app",
    messagingSenderId: "439617834638",
    appId: "1:439617834638:web:1faab75bddb3a5c690c3df",
    measurementId: "G-T7T67J8YXE"
  };

// Initialize Firebase only if an instance doesn't exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
