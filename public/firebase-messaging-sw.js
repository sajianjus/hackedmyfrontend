// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAxt-y-Tfr37_tghjsQSAphYB5GRWzYBv4",
  authDomain: "hackedmy.firebaseapp.com",
  projectId: "hackedmy",
  storageBucket: "hackedmy.appspot.com",
  messagingSenderId: "525490972388",
  appId: "1:525490972388:web:9dbcedd46e97c4ddab6ef1",
  measurementId: "G-9PHC8EPTES"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});