import Vue from 'vue';
import * as firebase from 'firebase';
import VueFire from 'vuefire';

require('firebase/firestore');

const config = {
    apiKey: 'AIzaSyC81q9_NkJ16bWV3JYklNo39LnWf4TWSq8',
    authDomain: 'vitrino-backend.firebaseapp.com',
    databaseURL: 'https://vitrino-backend.firebaseio.com',
    projectId: 'vitrino-backend',
    storageBucket: 'vitrino-backend.appspot.com',
    messagingSenderId: '711048819238',
};

try {
    firebase.initializeApp(config);
} catch (err) {
    // skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}

const firestore = firebase.firestore();

export default (ctx, inject) => {
    Vue.use(VueFire);

    inject('firebase', firebase);
    inject('firestore', firestore);
};
