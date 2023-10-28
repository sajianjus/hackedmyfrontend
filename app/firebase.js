// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyAxt-y-Tfr37_tghjsQSAphYB5GRWzYBv4",
  authDomain: "hackedmy.firebaseapp.com",
  projectId: "hackedmy",
  storageBucket: "hackedmy.appspot.com",
  messagingSenderId: "525490972388",
  appId: "1:525490972388:web:9dbcedd46e97c4ddab6ef1",
  measurementId: "G-9PHC8EPTES"
};
 

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);



export const refreshForToken = () => {
    return getToken(messaging, {vapidKey: 'BOmKEEg-AJsqGFLlMpxm6O72XRPXbLdZQLGz4cZIsb3I6Pb2Fe8uaGeoDKX5i-WER_RIvhPNoQ5uTT5ho_b63Oc'})
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        localStorage.fcmToken = currentToken;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }


  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});










