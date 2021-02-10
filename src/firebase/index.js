import firebase from 'firebase/app'
import '@firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDykmLnppdvhyarFjrsexb3P3oMN7P06pc",
    authDomain: "iwa-ecommerce.firebaseapp.com",
    projectId: "iwa-ecommerce",
    storageBucket: "iwa-ecommerce.appspot.com",
    messagingSenderId: "693320398283",
    appId: "1:693320398283:web:062886f6a7371b3b50f24e"
})

export function getFirebase() {
    return app
} 

export function getFirestore(){
    return firebase.firestore(app)
} 