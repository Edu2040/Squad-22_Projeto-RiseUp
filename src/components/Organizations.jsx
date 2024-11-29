import React, { useState, useEffect } from 'react';

const Organizations = ({ token }) => {
  const [empresas, setEmpresas] = useState([]);

  const fetchEmpresas = async (token) => {
    if (!token) return;

    const apiUrl = `https://crm.rdstation.com/api/v1/organizations?token=${token}`;

    try {
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) {
        throw new Error(`Erro ao buscar empresas: ${response.statusText}`);
      }

      const data = await response.json();
      setEmpresas(data.organizations); // Atualiza as empresas
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmpresas(token);
    }
  }, [token]); // Quando o token mudar, a requisição é feita novamente

  return (
    <div>
      <div id="organizations">
        {empresas.length > 0 ? (
          <ul>
            {empresas.map((empresa, index) => (
              <li key={index}>
                <strong>ID:</strong> {empresa._id || 'null'}<br />
                <strong>Nome:</strong> {empresa.name || 'null'}<br />
                <strong>Url:</strong> {empresa.url || 'null'}<br />
                <strong>Data Atualização:</strong> {empresa.updated_at || 'null'}<br />
                <strong>Data Criação:</strong> {empresa.created_at || 'null'}
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

export default Organizations;
