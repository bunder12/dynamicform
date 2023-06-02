import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCQ18YKfzrkThHPG1uN1hvHTH_evovyTqg",
  authDomain: "image-9cb24.firebaseapp.com",
  projectId: "image-9cb24",
  storageBucket: "image-9cb24.appspot.com",
  messagingSenderId: "896932722902",
  appId: "1:896932722902:web:5941480cc3eb0f443df177",
  measurementId: "G-L2KB6TDMEF"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);