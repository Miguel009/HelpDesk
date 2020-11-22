import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBOtxiziXqHE3zm22Xw2M8L5SgevmNAcbo",
    authDomain: "proyectosfr.firebaseapp.com",
    databaseURL: "https://proyectosfr.firebaseio.com",
    projectId: "proyectosfr",
    storageBucket: "proyectosfr.appspot.com",
    messagingSenderId: "349313304698",
    appId: "1:349313304698:web:7c1ac30cf22842a849d3c3"
    };
 const fb =  firebase.initializeApp(firebaseConfig);
 export const db = fb.database();