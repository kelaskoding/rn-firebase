import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const config = {
    apiKey: "AIzaSyAR5PVbaYCE8MPuu2YzRD9Zt5DunTOwXJg",
    authDomain: "kelaskoding-45ed2.firebaseapp.com",
    databaseURL: "https://kelaskoding-45ed2.firebaseio.com",
    projectId: "kelaskoding-45ed2",
    storageBucket: "kelaskoding-45ed2.appspot.com",
    messagingSenderId: "432800163779",
    appId: "1:432800163779:web:1f19ada817e7674e"
};
firebase.initializeApp(config);


export default firebase;