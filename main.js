// main.js

const firebaseConfig = {
  apiKey: "AIzaSyA-dZCP81GwzZGfUfzHpvx256kUBOTnfFc",
  authDomain: "pokerflix13.firebaseapp.com",
  projectId: "pokerflix13",
  storageBucket: "pokerflix13.firebasestorage.app",
  messagingSenderId: "693579295790",
  appId: "1:693579295790:web:1450375882cbf8bb4603bf"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogle() {
  auth.signInWithPopup(provider).then(() => showApp()).catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password).then(() => showApp()).catch(e => alert(e.message));
}

function logout() {
  auth.signOut().then(() => location.reload());
}

function showApp() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('header').style.display = 'flex';
  document.querySelector('#content').style.display = 'block';

  // Atualiza avatar
  const user = firebase.auth().currentUser;
  const avatar = document.getElementById('user-avatar');
  if (user && user.photoURL) {
    avatar.src = user.photoURL;
  } else {
    avatar.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // imagem padrão tipo boneco
  }

  applyLanguage(localStorage.getItem('lang') || 'pt-BR');
}

function toggleProfileMenu() {
  const menu = document.getElementById('profile-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(el => el.style.display = 'none');
  const section = document.getElementById(id);
  if (section) {
    section.style.display = 'block';
    applyLanguage(localStorage.getItem('lang') || 'pt-BR');
  }
}

function saveUserName() {
  const name = document.getElementById('user-name').value;
  alert(`Nome salvo: ${name}`);
}

function changeLanguage(lang) {
  localStorage.setItem('lang', lang);
  applyLanguage(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'pt-BR';
  document.getElementById('language-select').value = lang;
  applyLanguage(lang);
});
