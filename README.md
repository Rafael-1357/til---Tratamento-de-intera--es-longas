# TIL - Tratamento de Interações Longas

Este projeto visa resolver o problema de acompanhamento de interações longas. Através de um painel dinâmico, é possível verificar as interações em andamento, filtrar aquelas atribuídas ao seu usuário e visualizar as demais interações que estão com outros usuários do sistema.

## ✨ Diferencial: Atualizações em Tempo Real com WebSockets

O principal diferencial deste projeto é a implementação de **WebSockets** para garantir a comunicação em tempo real entre todos os usuários conectados.

Isso significa que o painel não precisa ser atualizado manualmente. Qualquer alteração no status de uma interação é instantaneamente refletida na tela de todos os analistas, promovendo um ambiente de trabalho mais colaborativo e eficiente.

**Como funciona:**
* **Quem está tratando?** Quando um analista se atribui a uma interação, o painel de todos os outros usuários é atualizado imediatamente, mostrando quem é o responsável e evitando que duas pessoas trabalhem na mesma tarefa.
* **Qual o status?** Qualquer mudança de status é transmitida para todos, dando uma visão clara do progresso.
* **Como foi tratado?** Ao finalizar uma interação, a ação é registrada e a interação é removida do painel ativo de forma automática para todos os usuários.

Essa abordagem elimina a necessidade de recarregar a página e garante que a equipe tenha uma visão unificada e sempre atualizada do fluxo de trabalho.


## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🚀 Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)

## 📖 Sobre o Projeto

Esta é uma aplicação full-stack construída para otimizar o gerenciamento de tarefas ou tickets que exigem um longo período de acompanhamento. A solução é dividida em:

* **Backend**: Uma API responsável pela lógica de negócio, autenticação e comunicação com o banco de dados.
* **Frontend**: Uma interface de usuário reativa que consome a API do backend para apresentar os dados de forma clara e permitir a interação do usuário.

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto em funcionamento na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. Recomenda-se a versão LTS.

Para verificar se você tem o Node.js e o npm instalados, execute os seguintes comandos no seu terminal:
```bash
node -v
npm -v
```

### Instalação

1 - Acesse a pasta do projeto
Navegue pelo terminal (CMD, PowerShell, etc.) até o diretório onde você salvou o projeto. Por exemplo:

```bash
cd "C:/Downloads/til - Tratamento de interações longas"
```

2 - Configure e execute o Backend
Em um terminal, execute os seguintes comandos:

```bash
# Navegue até a pasta do backend
cd backend

# Instale todas as dependências do projeto
npm i

# Inicie o servidor backend
npm start
```

O servidor backend estará em execução. Mantenha este terminal aberto.

3 - Configure e execute o Frontend
Abra um novo terminal na pasta raiz do projeto (til - Tratamento de interações longas).

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale todas as dependências do projeto
npm i

# Inicie o servidor de desenvolvimento do frontend
npm run dev
```

Agora, a aplicação deve estar acessível em seu navegador, geralmente em um endereço como http://localhost:5173. Verifique o output do terminal para o endereço exato.
