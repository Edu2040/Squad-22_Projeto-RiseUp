import React, { useState, useEffect } from 'react';

const Contacts = ({ token }) => {
  const [contatos, setContatos] = useState([]);

  // Função para buscar os contatos com o token
  const fetchContatos = async (token) => {
    if (!token) return;

    const apiUrl = `https://crm.rdstation.com/api/v1/contacts?token=${token}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar contatos: ${response.statusText}`);
      }

      const data = await response.json();
      setContatos(data.contacts); // Atualiza os contatos
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  };

  // Effect que observa mudanças no token e realiza a requisição
  useEffect(() => {
    if (token) {
      fetchContatos(token);
    }
  }, [token]); // O useEffect será chamado toda vez que o token mudar

  return (
    <div>
      <div id="contacts">
        {contatos.length > 0 ? (
          <ul>
            {contatos.map((contact, index) => (
              <li key={index}>
                <strong>ID:</strong> {contact._id ? contact._id : "null"}<br />
                <strong>Nome:</strong> {contact.name ? contact.name : "null"}<br />
                <strong>Email:</strong> {contact.emails && contact.emails.length > 0 && contact.emails[0].email ? contact.emails[0].email : "null"}<br />
                <strong>Cargo:</strong> {contact.title ? contact.title : "null"}<br />
                <strong>Telefone:</strong> {contact.phones && contact.phones.length > 0 && contact.phones[0].phone ? contact.phones[0].phone : "null"}<br />
                <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum contato encontrado. <br />
            (Favor inserir token)
          </p>
        )}
      </div>
    </div>
  );
};

export default Contacts;
