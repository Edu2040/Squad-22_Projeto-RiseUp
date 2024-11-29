import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/* document.addEventListener('DOMContentLoaded', function() {
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ action: "fetchContacts" }, function(response) {
      const contactsDiv = document.getElementById('contacts');

      if (contactsDiv) {
        if (response.error) {
          contactsDiv.innerHTML = `<p>Erro ao buscar contatos: ${response.error}</p>`;
          return;
        }
        const contacts = response.contacts;

        if (contacts && contacts.length > 0) {
          contactsDiv.innerHTML = '<ul>' + contacts.map(contact => 
            `<li>
              <strong>ID:</strong> ${contact._id ? contact._id : "null"}<br>
              <strong>Nome:</strong> ${contact.name ? contact.name : "null"}<br>
              <strong>Email:</strong> ${contact.emails && contact.emails.length > 0 && contact.emails[0].email ? contact.emails[0].email : "null"}<br>
              <strong>Cargo:</strong> ${contact.title ? contact.title : "null"}<br>
              <strong>Telefone:</strong> ${contact.phones && contact.phones.length > 0 && contact.phones[0].phone ? contact.phones[0].phone : "null"}
            </li><br>`
          ).join('') + '</ul>';
        } else {
          contactsDiv.innerHTML = '<p>Nenhum contato encontrado.</p>';
        }
      } else {
        console.warn("Elemento com ID 'contacts' não encontrado.");
      }
    });
  } else {
    console.warn("chrome.runtime.sendMessage não está disponível.");
    const contactsDiv = document.getElementById('contacts');
    if (contactsDiv) {
      contactsDiv.innerText = "Ambiente de desenvolvimento - API do Chrome não disponível.";
    }
  }
}); */

createRoot(document.getElementById("root")).render(
  <div>
  <StrictMode>
    <App />
  </StrictMode>
  </div>
);