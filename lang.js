// lang.js

function applyLanguage(lang) {
  const heading = document.getElementById('dashboard-title');
  const t = (id, value) => document.getElementById(id).textContent = value;
  const p = (id, value) => document.getElementById(id).placeholder = value;
  const g = (html) => document.getElementById('google-button').innerHTML = html;

  if (lang === 'pt-BR') {
    if (heading) heading.textContent = "Continuar a ver";
    t("title-tag", "PokerPrime - Sua Evolução no Poker");
    t("brand-title", "POKERPRIME");
    t("menu-home", "🏠 Início");
    t("menu-profile", "👤 Meu Perfil");
    t("menu-settings", "⚙️ Configurações");
    t("menu-support", "❓ Suporte");
    t("menu-logout", "🚪 Sair");
    t("login-title", "Login");
    t("login-button", "Entrar");
    g('<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo"> Entrar com Google');
    p("email", "Email");
    p("password", "Senha");
    t("welcome-text", "Bem-vindo ao PokerPrime! Selecione uma seção acima.");
    t("profile-title", "👤 Meu Perfil");
    p("user-name", "Seu nome completo");
    t("settings-title", "⚙️ Configurações");
    t("support-title", "❓ Suporte");
    t("support-text", "Precisa de ajuda? Fale com nosso time pelo WhatsApp: 📞 (11) 99999-9999");
  } else if (lang === 'en') {
    if (heading) heading.textContent = "Keep Watching";
    t("title-tag", "PokerPrime - Your Evolution in Poker");
    t("brand-title", "POKERPRIME");
    t("menu-home", "🏠 Home");
    t("menu-profile", "👤 My Profile");
    t("menu-settings", "⚙️ Settings");
    t("menu-support", "❓ Support");
    t("menu-logout", "🚪 Logout");
    t("login-title", "Login");
    t("login-button", "Login");
    g('<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo"> Continue with Google');
    p("email", "Email");
    p("password", "Password");
    t("welcome-text", "Welcome to PokerPrime! Select a section above.");
    t("profile-title", "👤 My Profile");
    p("user-name", "Your full name");
    t("settings-title", "⚙️ Settings");
    t("support-title", "❓ Support");
    t("support-text", "Need help? Contact us via WhatsApp: 📞 (11) 99999-9999");
  }
}
