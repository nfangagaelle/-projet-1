document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.message-input button');
    const messageInput = document.querySelector('.message-input input');
    const messagesContainer = document.querySelector('.messages-container');

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            // Créer le nouvel élément de message
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
newMessagesDiv.appendChild(timestamp);

            // Vider le champ de saisie

            messageInput.value = '';

            // Faire défiler vers le bas
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Clic sur le bouton Envoyer
    sendButton.addEventListener('click', sendMessage);

    // Envoi avec la touche Entrée
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});