import React, { useState, useEffect } from 'react';

const DealStages = ({ token }) => {
  const [etapas, setEtapas] = useState([]);

  const fetchEtapas = async (token) => {
    if (!token) return;

    const apiUrl = `https://crm.rdstation.com/api/v1/deal_stages?token=${token}`;

    try {
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) {
        throw new Error(`Erro ao buscar etapas do funil: ${response.statusText}`);
      }

      const data = await response.json();
      setEtapas(data.deal_stages); // Atualiza as etapas do funil
    } catch (error) {
      console.error('Erro ao buscar etapas do funil:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEtapas(token);
    }
  }, [token]);

  return (
    <div>
      <div id="deal_stages">
        {etapas.length > 0 ? (
          <ul>
            {etapas.map((etapa, index) => (
              <li key={index}>
                <strong>Nome:</strong> {etapa.name || 'null'}<br />
                <strong>Apelido:</strong> {etapa.nickname || 'null'}<br />
                <strong>Criado em:</strong>{' '}
                {etapa.created_at
                  ? new Date(etapa.created_at).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : 'null'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma etapa do funil encontrada. <br />
            (Favor inserir token)</p>
        )}
      </div>
    </div>
  );
};


export default DealStages;
