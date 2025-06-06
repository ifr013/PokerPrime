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
const db = firebase.firestore();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(error) {
  console.error("Erro ao configurar persistência:", error);
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogle() {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => auth.signInWithPopup(provider))
    .then((result) => {
      localStorage.setItem('photoURL', result.user.photoURL || '');
      showApp();
    })
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    return auth.signInWithEmailAndPassword(email, password);
  }).then(() => showApp()).catch(e => alert(e.message));
}

function logout() {
  auth.signOut().then(() => location.reload());
}

function showApp() {
  const user = firebase.auth().currentUser || { photoURL: localStorage.getItem('photoURL') };
  if (!user) return;

  db.collection('usuarios').doc(user.uid).get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      if (data.nome) document.getElementById('user-name').value = data.nome;
      if (data.email) document.getElementById('user-email').value = data.email;
      if (data.cpf) document.getElementById('user-cpf').value = data.cpf;
      if (data.nascimento) document.getElementById('user-birth').value = data.nascimento;
      if (data.telefone) document.getElementById('user-phone').value = data.telefone;
    }
  }).catch((error) => console.error('Erro ao carregar dados:', error));

  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('header').style.display = 'flex';
  document.querySelector('#content').style.display = 'block';

  const avatar = document.getElementById('user-avatar');
  if (user.photoURL) {
    avatar.src = user.photoURL;
  } else {
    avatar.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  }

  if (user.displayName) document.getElementById('user-name').value = user.displayName;
  if (user.email) document.getElementById('user-email').value = user.email;

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
  const user = firebase.auth().currentUser;
  if (!user) return alert('Você precisa estar logado.');

  const uid = user.uid;
  const data = {
    nome: document.getElementById('user-name').value,
    email: document.getElementById('user-email').value,
    cpf: document.getElementById('user-cpf').value,
    nascimento: document.getElementById('user-birth').value,
    telefone: document.getElementById('user-phone').value
  };

  firebase.firestore().collection('usuarios').doc(uid).set(data)
    .then(() => alert('Dados salvos com sucesso!'))
    .catch(error => alert('Erro ao salvar: ' + error.message));
}
