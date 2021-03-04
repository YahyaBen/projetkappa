import firebase from "firebase/app"
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaorXZWuRpA0Z6d7BECMspiOz6SK-cRvo",
    authDomain: "erwen-123a3.firebaseapp.com",
    projectId: "erwen-123a3",
    storageBucket: "erwen-123a3.appspot.com",
    messagingSenderId: "1064307276267",
    appId: "1:1064307276267:web:e64b47ad4813451f1dc1ae",
    measurementId: "G-47MDTWWD7Y"
  };

firebase.initializeApp(firebaseConfig)

export default firebase
