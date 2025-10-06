# TIL - Tratamento de Interações Longas

Este projeto visa resolver o problema de acompanhamento de interações longas. Através de um painel dinâmico, é possível verificar as interações em andamento, filtrar aquelas atribuídas ao seu usuário e visualizar as demais interações que estão com outros usuários do sistema.

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🚀 Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)

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
