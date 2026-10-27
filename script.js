(function(){
// Initialisation de Supabase
const SUPABASE_URL = 'https://xnydshxchpfjyuysvgv.supabase.co';
const SUPABASE_ANON_KEY ='sb_publishable_A7j0QW8H021_zeKcw3yUyA_8J1LZpZq'  ; // Pensez à mettre votre clé anon ici
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.message-input button');
    const messageInput = document.querySelector('.message-input input');
    const messagesContainer = document.querySelector('.messages-container');

    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            
            // 1. Enregistrement dans Supabase (table "messages")
            const { data, error } = await supabase
                .from('messages')
                .insert([{ content: messageText }]);

            if (error) {
                console.error("Erreur lors de l'envoi du message :", error.message);
            } else {
                console.log("Message sauvegardé dans Supabase !", data);
            }

            // 2. Création visuelle du message à l'écran (votre code d'origine)
            const newMessageDiv = document.createElement('div');
            newMessageDiv.classList.add('message', 'sent');

            const paragraph = document.createElement('p');
            paragraph.textContent = messageText;

            newMessageDiv.appendChild(paragraph);
            messagesContainer.appendChild(newMessageDiv);

            const timestamp = document.createElement('span');
            const now = new Date();
            timestamp.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            timestamp.style.fontSize = '10px';
            timestamp.style.color = '#777';
            timestamp.style.display = 'block';
            timestamp.style.marginTop = '5px';
            timestamp.style.textAlign = 'right';
            newMessageDiv.appendChild(timestamp);

            // Vider le champ de saisie
            messageInput.value = '';

            // Faire défiler vers le bas
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Clic sur le bouton Envoyer
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Envoi avec la touche Entrée
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
})();
