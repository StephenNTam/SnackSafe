import firebase from 'firebase';

var firebaseConfig = {
apiKey: "AIzaSyClgkIQAGfFiywgcCsSiXZcmyDZf8WJC5I",
authDomain: "snacksafelogin.firebaseapp.com",
projectId: "snacksafelogin",
storageBucket: "snacksafelogin.appspot.com",
messagingSenderId: "674549942385",
appId: "1:674549942385:web:88f1341f4d5a8e9dddb3d0",
measurementId: "G-G45PB6EYBL"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;