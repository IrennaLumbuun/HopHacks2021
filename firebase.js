import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD6GHBcdp8e-ukMy3Czxz8P65b6Eetf4Kg",
  authDomain: "waste-fighters.firebaseapp.com",
  projectId: "waste-fighters",
  storageBucket: "waste-fighters.appspot.com",
  messagingSenderId: "716160403468",
  appId: "1:716160403468:web:d88542552cc3a413d58629"
};

if (firebase.apps.length === 0) {
  console.log('firebase', firebase.apps);
  firebase.initializeApp(firebaseConfig);
  console.log('firebase', firebase.apps);
}

export default firebase;