import firebase from 'firebase/app';

if (firebase.apps.length === 0) {
  console.log('firebase', firebase.apps);
  firebase.initializeApp(firebaseConfig);
  console.log('firebase', firebase.apps);
}

export default firebase;