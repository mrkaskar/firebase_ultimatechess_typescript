import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyCsIo1ofFasB3goNCP0WtAC2O7V7yW5sk8",
    authDomain: "alphachesskzt.firebaseapp.com",
    projectId: "alphachesskzt",
    storageBucket: "alphachesskzt.appspot.com",
    messagingSenderId: "1082531277506",
    appId: "1:1082531277506:web:f96aed897058bd8497295b",
    measurementId: "G-B1YG8MBPBZ"
}
if(!firebase.apps.length){
    firebase.initializeApp(config);
}

export default firebase;


