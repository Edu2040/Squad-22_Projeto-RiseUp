import React, { useState, useEffect } from 'react';
import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LogoFull from "./assets/logofull.png";
import InputToken from "./components/InputToken.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { ModeToggle } from "./components/mode-toggle.jsx";
import { SettingsExtension } from "./components/SettingsExtension";
import Contacts from "./components/Contacts";
import Organizations from './components/Organizations';
import Deals from './components/Deals';
import DealStages from './components/DealStages';
import Tasks from './components/Tasks';
import Campaigns from './components/Campaigns';

function extractTicketId(url) {
  const regex = /\/atendimento\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function fetchContactData(ticketId) {
  // Solicita o token do background.js
  chrome.runtime.sendMessage({ requestToken: true }, (response) => {
      const token = response.tokenJet;  // Recebe o token da resposta

      if (!token) {
          console.error("Token não encontrado.");
          return;
      }

      const apiUrl = `https://chatapi.jetsalesbrasil.com/tickets/${ticketId}`;

      // Realiza a requisição à API
      fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
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
          const contact = data.contact; // Obtém o contato
          document.getElementById("jetsales").innerText = `Cliente: ${contact.number}`; // Atualiza a div
      })
      .catch(error => {
          document.getElementById("jetsales").innerText = `Erro: ${error.message}`; // Exibe o erro
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      const ticketId = extractTicketId(url);

      const jetsalesDiv = document.getElementById("jetsales");
      if (ticketId && jetsalesDiv) {
        fetchContactData(ticketId);
      } else if (jetsalesDiv) {
        jetsalesDiv.innerText = "ID não encontrado ou ticket não aberto";
      }
    });
  } else {
    console.warn("chrome.tabs.query não está disponível.");
    const jetsalesDiv = document.getElementById('jetsales');
    if (jetsalesDiv) {
      jetsalesDiv.innerText = "Ambiente de desenvolvimento - API do Chrome não disponível.";
    }
  }
});

if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const jetsalesDiv = document.getElementById("jetsales");
    if (request.number && jetsalesDiv) {
      jetsalesDiv.innerText = `Cliente: ${request.number}`;
    }
  });
} else {
  console.warn("chrome.runtime.onMessage não está disponível.");}
  
function App() {
  const [token, setToken] = useState('');

  // Função para atualizar o estado do token
  const handleTokenChange = (newToken) => {
    setToken(newToken);
  };

  // Recupera o token armazenado no chrome.storage quando o componente for montado
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get('token', (result) => {
        if (result.token) {
          setToken(result.token); // Se o token for encontrado, atualiza o estado
        }
      });
    } else {
      console.warn('chrome.storage não disponível, rodando fora do contexto da extensão.');
    }
  }, []);

  const [switches, setSwitches] = useState({
    "users-data": true,
    organizations: true,
    "financial-data": true,
    platforms: true,
    deals: true,
    "deal-stages": true,
    tasks: true,
    campaigns: true,
  });

  const handleSwitchChange = (id, value) => {
    setSwitches((prev) => ({ ...prev, [id]: value }));
  };


  return (
    <div className="p-6 max-w-4xl mx-auto items-center">
      <Card className="w-[410px] h-full">
        <CardHeader>
          <SettingsExtension switches={switches} onSwitchChange={handleSwitchChange} />
          <CardTitle className="text-center grid gap-2">
            <img src={LogoFull} />
            <div className="grid w-full h-full items-center gap-20">
              <div id="jetsales">
                <p>Cliente:</p>
              </div>
            </div>
          </CardTitle>
          <CardContent className="grid gap-2">
            <Card className="w-full h-full">
              <CardContent>
              <Accordion type="single" collapsible className="w-full">
        {switches["users-data"] && (
          <AccordionItem className="text-xl" value="item-1">
            <AccordionTrigger>
              <strong>DADOS DO USUÁRIO</strong>
            </AccordionTrigger>
            <AccordionContent>
              <Contacts token={token} />
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["organizations"] && (
          <AccordionItem className="text-xl" value="item-2">
            <AccordionTrigger>
              <strong>EMPRESAS</strong>
            </AccordionTrigger>
            <AccordionContent>
              <Organizations token={token} />
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["financial-data"] && (
          <AccordionItem className="text-xl" value="item-3">
            <AccordionTrigger>
              <strong>DADOS FINANCEIROS</strong>
            </AccordionTrigger>
            <AccordionContent>
              <strong>Valor Total de Vendas:</strong> R$ 120.000<p></p>
              <strong>Ticket Médio:</strong> R$ 2.000<p></p>
              <strong>Receita Recorrente Mensal:</strong> R$ 80.000<p></p>
              <strong>Receita Recorrente Anual:</strong> R$ 960.000<p></p>
              <strong>Meta de Vendas:</strong> R$ 150.000<p></p>
              <strong>Comissões de Vendas:</strong> R$ 12.000<p></p>
              <strong>Tempo Médio de Fechamento:</strong> 15 dias<p></p>
              <strong>Taxa de Conversão:</strong> 20%<p></p>
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["platforms"] && (
          <AccordionItem className="text-xl" value="item-4">
            <AccordionTrigger>
              <strong>PLATAFORMAS</strong>
            </AccordionTrigger>
            <AccordionContent>
              <strong>JetGo:</strong> <br />
              <strong>JetSender:</strong> <br />
              <strong>JetSales:</strong> <br />
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["deals"] && (
          <AccordionItem className="text-xl" value="item-5">
            <AccordionTrigger>
              <strong>NEGOCIAÇÕES</strong>
            </AccordionTrigger>
            <AccordionContent>
              <Deals token={token} />
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["deal-stages"] && (
          <AccordionItem className="text-xl" value="item-6">
            <AccordionTrigger>
              <strong>ETAPAS DO FUNIL</strong>
            </AccordionTrigger>
            <AccordionContent>
              <DealStages token={token} />
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["tasks"] && (
          <AccordionItem className="text-xl" value="item-7">
            <AccordionTrigger>
              <strong>TAREFAS</strong>
            </AccordionTrigger>
            <AccordionContent>
              <Tasks token={token} />
            </AccordionContent>
          </AccordionItem>
        )}
        {switches["campaigns"] && (
          <AccordionItem className="text-xl" value="item-8">
            <AccordionTrigger>
              <strong>CAMPANHAS</strong>
            </AccordionTrigger>
            <AccordionContent>
              <Campaigns token={token} />
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter className="gap-36 flex-auto">
          <InputToken token={token} onTokenChange={handleTokenChange} />
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <ModeToggle />
          </ThemeProvider>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}

export default App;