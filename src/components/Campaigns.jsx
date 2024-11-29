import React, { useState, useEffect } from 'react';

const Campaigns = ({ token }) => {
  const [campanhas, setCampanhas] = useState([]);

  const fetchCampanhas = async (token) => {
    if (!token) return;

    const apiUrl = `https://crm.rdstation.com/api/v1/campaigns?token=${token}`;

    try {
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) {
        throw new Error(`Erro ao buscar campanhas: ${response.statusText}`);
      }

      const data = await response.json();
      setCampanhas(data.campaigns); // Atualiza as campanhas
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCampanhas(token);
    }
  }, [token]);

  return (
    <div>
      <div id="campaigns">
        {campanhas.length > 0 ? (
          <ul>
            {campanhas.map((campanha, index) => (
              <li key={index}>
                <strong>ID:</strong> {campanha._id || 'null'}<br />
                <strong>Nome:</strong> {campanha.name || 'null'}<br />
                <strong>Criado em:</strong>{' '}
                {campanha.created_at
                  ? new Date(campanha.created_at).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : 'null'}<br />
                <strong>Atualizado em:</strong>{' '}
                {campanha.created_at
                  ? new Date(campanha.updated_at).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : 'null'}
              </li>
            ))}
          </ul>
        ) : (
            <p>Nenhuma empresa encontrada. <br />
            (Favor inserir token)</p>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
