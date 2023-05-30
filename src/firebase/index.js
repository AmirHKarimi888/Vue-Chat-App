import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDSZHaacMmEGr69pL2w5DYYhvdd--Nw_e8",
    authDomain: "chat-app-1-27d68.firebaseapp.com",
    projectId: "chat-app-1-27d68",
    storageBucket: "chat-app-1-27d68.appspot.com",
    messagingSenderId: "620933095858",
    appId: "1:620933095858:web:4e32953fd5e8a0ceff04ab",
    measurementId: "G-SVM0XHTYTB",
    databaseURL: "https://chat-app-1-27d68-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database }