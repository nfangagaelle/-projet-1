document.addEventListener('DOMContentLoaded', () => {
  const supabaseUrl = 'https://xnydshxchpfjuyuqsvgv.supabase.co';
  const supabaseKey = 'sb_publishable_A7J0QW021_zskcw3yuyA_831LzpZq';
  const client = window.supabase.createClient(supabaseUrl, supabaseKey);

  const btn = document.getElementById('btn-inscrire');
  const message = document.getElementById('message');

  btn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = username + "@test.com";

    const { data, error } = await client.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      message.textContent = "Erreur : " + error.message;
    } else {
      message.textContent = "Bravo ! Compte créé pour " + username;
    }
  });
});
