import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCFJbcyrNUUSS6XwFW6IMcQd3MW2Vxp1ds",
    authDomain: "chama-to-do-c5620.firebaseapp.com",
    databaseURL: "https://chama-to-do-c5620.firebaseio.com",
    projectId: "chama-to-do-c5620",
    storageBucket: "chama-to-do-c5620.appspot.com",
    messagingSenderId: "1033433721847"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth
}