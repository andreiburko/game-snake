const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD2x7UVD-Y5geJ6OG8f59PoLyIsJ92mR1I",
  authDomain: "snake-game-79d60.firebaseapp.com",
  projectId: "snake-game-79d60",
  storageBucket: "snake-game-79d60.appspot.com",
  messagingSenderId: "894949777685",
  appId: "1:894949777685:web:278d611cf4ab57c66ec91c"
});

const snakeGameDB = firebaseApp.database();
const snakeGameAuth = firebaseApp.auth();