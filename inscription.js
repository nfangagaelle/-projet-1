const SUPABASE_URL = 'https://xnydshxchpfjuyuqsvgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_A7J0QW021_zskcw3yuyA_831LzpZq';
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('btn-inscrire').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');
  message.textContent = 'En cours...';
  if (!username || !password) { alert('Remplis les 2 champs'); return; }
  const email = username.includes('@') ? username : username + '@filrouge.local';
  const { data, error } = await client.auth.signUp({ email: email, password: password });
  if (error) {
    message.textContent = 'Erreur : ' + error.message;
    alert('Erreur : ' + error.message);
  } else {
    message.textContent = 'Inscription réussie !';
    alert('Inscription réussie !');
  }
});