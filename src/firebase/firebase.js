import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyCFJbcyrNUUSS6XwFW6IMcQd3MW2Vxp1ds",
    authDomain: "chama-to-do-c5620.firebaseapp.com",
    databaseURL: "https://chama-to-do-c5620.firebaseio.com",
    projectId: "chama-to-do-c5620",
    storageBucket: "chama-to-do-c5620.appspot.com",
    messagingSenderId: "1033433721847"
};

if (!firebase.app.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();