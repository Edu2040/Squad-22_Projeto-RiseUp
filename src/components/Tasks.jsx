import React, { useState, useEffect } from 'react';

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (token) => {
    if (!token) return;

    const apiUrl = `https://crm.rdstation.com/api/v1/tasks?token=${token}`;

    try {
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) {
        throw new Error(`Erro ao buscar tarefas: ${response.statusText}`);
      }

      const data = await response.json();
      setTasks(data.tasks); // Atualiza as tarefas
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks(token);
    }
  }, [token]);

  return (
    <div>
      <div id="tasks">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <strong>ID:</strong> {task.id || 'null'}<br />
                <strong>Nome do Negócio:</strong> {task.deal?.name || 'null'}<br />
                <strong>Assunto:</strong> {task.subject || 'null'}<br />
                <strong>Tipo:</strong> {task.type || 'null'}<br />
                <strong>Criado em:</strong>{' '}
                {task.created_at
                  ? new Date(task.created_at).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : 'null'}
              </li>
            ))}
          </ul>
        ) : (
            <p>Nenhuma tarefa encontrada. <br />
            (Favor inserir token)</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;