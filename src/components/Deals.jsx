import React, { useState, useEffect } from 'react';

const Deals = ({ token }) => {
  const [negociacoes, setNegociacoes] = useState([]);

  const fetchNegociacoes = async (token) => {
    if (!token) return;

    const apiUrl = `https://crm.rdstation.com/api/v1/deals?token=${token}`;

    try {
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) {
        throw new Error(`Erro ao buscar negociações: ${response.statusText}`);
      }

      const data = await response.json();
      setNegociacoes(data.deals); // Atualiza as negociações
    } catch (error) {
      console.error('Erro ao buscar negociações:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNegociacoes(token);
    }
  }, [token]);

  return (
    <div>
      <div id="deals">
        {negociacoes.length > 0 ? (
          <ul>
            {negociacoes.map((negociacao, index) => (
              <li key={index}>
                <strong>ID:</strong> {negociacao._id || 'null'}<br />
                <strong>Nome:</strong> {negociacao.name || 'null'}<br />
                <strong>Valor Mensal:</strong> {negociacao.amount_montly || 'null'}<br />
                <strong>Valor Único:</strong> {negociacao.amount_unique || 'null'}<br />
                <strong>Valor Total:</strong> {negociacao.amount_total || 'null'}<br />
                <strong>Última Atualização:</strong> {negociacao.last_activity_content || 'null'}<br />
                <strong>Data Última Atualização:</strong> {negociacao.last_activity_at || 'null'}<br />
                <strong>Data Atualização:</strong> {negociacao.updated_at || 'null'}<br />
                <strong>Data Criação:</strong> {negociacao.created_at || 'null'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma negociação encontrada. <br />
            (Favor inserir token)</p>
        )}
      </div>
    </div>
  );
};

export default Deals;
