function token () {
    var tokenJet = window.localStorage.getItem('token');

  if (!tokenJet) {
    console.error("Token não encontrado no localStorage da página.");
    return;
  }
  tokenJet = tokenJet.replace(/["']/g, '');
  console.log(`token: ${tokenJet}`)

    // Envia o token para o background.js
    const message = { tokenJet: tokenJet };
    console.log('Mensagem a ser enviada para o background.js:', message);  // Log da mensagem
    chrome.runtime.sendMessage(message);
}

token()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.contacts) {
    console.log('Contatos recebidos:', message.contacts);
    // Agora, você pode manipular os dados ou atualizar a interface na página
  }
});
