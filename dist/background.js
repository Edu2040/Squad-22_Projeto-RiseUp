chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchContacts") {
    fetchContacts().then(response => {
      sendResponse(response);
    }).catch(error => {
      console.error("Erro ao buscar contatos:", error);
      sendResponse({error: error.message});
    });
    return true; // Manter a porta aberta para respostas assíncronas
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.token) {
    console.log('Token recebido no background script:', request.token);
    fetchContacts(request.token).then((data) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { contacts: data.contacts });
      });
    });
  }
});

async function fetchContacts(token) {
  const apiUrl = `https://crm.rdstation.com/api/v1/contacts?token=${token}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar contatos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Contatos recebidos:", data);
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}


let tokenStorage = '';  // Variável para armazenar o token

// Escuta as mensagens do content_script.js e armazena o token
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.tokenJet) {
        tokenStorage = message.tokenJet;  // Armazena o token no background.js
        console.log(`Token armazenado no background.js: ${tokenStorage}`);
    }

    // Responde à solicitação do main.jsx
    if (message.requestToken) {
        sendResponse({ tokenJet: tokenStorage });  // Retorna o token armazenado
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('https://chat.jetsalesbrasil.com/#/atendimento/')) {
      const ticketId = extractTicketId(tab.url);
      if (ticketId) {
          fetchContactData(ticketId); // Faço a requisição com o ID extraído
      }
  }
});

function extractTicketId(url) {
  const regex = /\/atendimento\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function fetchContactData(ticketId) {
  if (!tokenStorage) {
      console.error("Token não encontrado no background.js.");
      return;
  }

  const apiUrl = `https://chatapi.jetsalesbrasil.com/tickets/${ticketId}`;

  fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${tokenStorage}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Erro ao buscar dados do ticket: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      const contact = data.contact;
      chrome.runtime.sendMessage({ number: contact.number });
  })
  .catch(error => {
      console.error(`Erro: ${error.message}`);
  });
}