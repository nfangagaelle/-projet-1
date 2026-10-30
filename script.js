(function(){
 const SUPABASE_URL = 'https://xnydshxchpfjyuyqsgvg.supabase.co';
 const SUPABASE_ANON_KEY = 'sb_publishable_A7j00W8H021_zeKcw3yUyA_83ILzpZq';
 const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

 document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.message-input button') || document.querySelector('button');
    const messageInput = document.querySelector('.message-input input') || document.querySelector('input[type="text"]');
    const messagesContainer = document.querySelector('.messages-container') || document.querySelector('.messages');
    const titleElement = document.querySelector('.chat-header h2, h2, .header h3');
    
    // On prend le titre actuel comme salon par défaut
    let CURRENT_SALON = titleElement ? titleElement.textContent.trim() : 'Kaela & Kaely';
    let currentChannel = null;

    let myId = localStorage.getItem('myId');
    if (!myId) { myId = 'user_' + Math.random().toString(36).substr(2,9); localStorage.setItem('myId', myId); }

    function afficherMessage(content, senderId, isSent) {
        const div = document.createElement('div');
        div.className = 'message ' + (isSent ? 'sent' : 'received');
        const p = document.createElement('p'); p.textContent = content; div.appendChild(p);
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function loadMessages() {
        messagesContainer.innerHTML = '';
        const { data } = await supabase.from('messages').select('*').eq('salon', CURRENT_SALON).order('created_at', {ascending:true});
        if(data) data.forEach(msg => afficherMessage(msg.content, msg.sender_id, msg.sender_id === myId));
    }

    function subscribeSalon() {
        if(currentChannel) supabase.removeChannel(currentChannel);
        currentChannel = supabase.channel('chat-'+CURRENT_SALON).on('postgres_changes', {event:'INSERT', schema:'public', table:'messages', filter:`salon=eq.${CURRENT_SALON}`}, payload => {
            if(payload.new.sender_id === myId) return;
            afficherMessage(payload.new.content, payload.new.sender_id, false);
        }).subscribe();
    }

    async function sendMessage() {
        const txt = messageInput.value.trim(); if(!txt) return;
        afficherMessage(txt, myId, true); messageInput.value = '';
        await supabase.from('messages').insert([{ content: txt, salon: CURRENT_SALON, sender_id: myId }]);
    }

    // --- CLIC SUR CONTACTS ET SALONS ---
    function setupClicks() {
        // Trouve tous les éléments qui contiennent Ferdinand, Cedric, Kaela
        const allItems = document.querySelectorAll('li, div, span, p, a');
        allItems.forEach(el => {
            const text = el.textContent.trim();
            if (text === 'Ferdinand' || text === 'Cédric' || text === 'Cedric' || text === 'Kaela & Kaely') {
                el.style.cursor = 'pointer';
                el.addEventListener('click', () => {
                    CURRENT_SALON = text === 'Cedric' ? 'Cédric' : text;
                    if(titleElement) titleElement.textContent = CURRENT_SALON;
                    console.log("Changement vers:", CURRENT_SALON);
                    loadMessages();
                    subscribeSalon();
                });
            }
        });
    }

    if (sendButton) sendButton.addEventListener('click', sendMessage);
    if (messageInput) messageInput.addEventListener('keypress', e => { if(e.key === 'Enter') sendMessage(); });

    setupClicks();
    loadMessages();
    subscribeSalon();
 });
})();
