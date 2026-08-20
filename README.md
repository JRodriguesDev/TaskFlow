# Task Flow - Gestão de Tarefas & Produtividade
O Task Flow é uma aplicação Full Stack de gerenciamento de tarefas focada em produtividade diária, análise de desempenho e planejamento visual. O sistema oferece métricas em tempo real sobre o progresso das demandas, pré-filtros ágeis, visualização em calendário e integração direta com o Google Calendar API para sincronização nativa de eventos e lembretes.

## Funcionalidades do Sistema

### Visão Geral & Métricas (Overview)
- **Progresso Diário:** Barra de progresso dinâmica acompanhando o percentual de conclusão das tarefas do dia.
- **Planejamento Futuro:** Listagem dedicada para antecipar demandas do dia seguinte.
- **Controle de Atrasos:** Painel de alerta com destaque para tarefas pendentes que ultrapassaram o prazo.
- **Pré-Filtros Ágeis:** Botões de filtragem rápida na parte inferior da tela para alternar a visualização entre tarefas pendentes, concluídas, prioritárias ou por categoria com apenas um clique.

### Gestão de Tarefas & Integração com Google Calendar (Task Page)
- **CRUD Completo:** Criação, edição, alteração de status e remoção de tarefas.
- **Sincronização com Google Calendar:** Ao criar ou atualizar uma tarefa na aplicação, o evento pode ser sincronizado na agenda do Google do usuário.
- **Notificações Automáticas:** Aproveita o ecossistema nativo do Google Calendar para disparar lembretes (pop-ups/notificações push) no celular ou navegador do usuário antes do vencimento do compromisso.

### Visualização em Calendário (Calendar Page)
- **Mapeamento Temporal:** Exibição intuitiva de tarefas dispostas em formato de calendário mensal/semanal.
- **Projeção de Demandas:** Navegação simplificada para planejamento de tarefas de meses futuros.

### Autenticação, Perfil & Segurança (Auth.js)
- **Múltiplos Provedores (Auth.js):** Suporte a login por credenciais (e-mail e senha com hash seguro via bcryptjs) e OAuth 2.0 com Google.
- **Gerenciamento de Tokens OAuth:** Painel de configurações com fluxo de reconexão de token para manter a integração com a API do Google ativa sem perdas de sessão.
- **Página de Segurança:** Área dedicada para alteração e redefinição de senha do usuário.
- **Gerenciamento de Perfil:** Alteração de dados cadastrais como nome de exibição.

## Stack Tecnológica

### Core & UI
- **[Next.js](https://nextjs.org/):** App Router, Server Actions e API Routes.
- **[React](https://react.dev/)**: Biblioteca para construção de interfaces reativas.
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária e responsiva.
- **[Shadcn/UI](https://ui.shadcn.com/):** Componentes de interface acessíveis.
- **[Motion (Framer Motion)](https://motion.dev/):** Animações fluidas de transição de telas e elementos da UI.
- **[React Icons](https://react-icons.github.io/react-icons/):** Pacotes de iconografia moderna.
- **[Sonner](https://sonner.emilkowal.ski/):** Sistema de notificações Toast reativas para feedback visual do usuário.

### Back-End, Banco de Dados & Segurança
- **[Prisma ORM](https://www.prisma.io/orm):** Modelagem de dados, migrações e consultas no banco de dados.
- **[PostgreSQL](https://hub.docker.com/_/postgres):** Banco de dados relacional via container Docker.
- **[Auth.js (NextAuth)](https://authjs.dev/):** Gerenciamento de sessões com @auth/prisma-adapter.
- **[Google APIs (googleapis)](https://developers.google.com/workspace/calendar/api/guides/overview?hl=pt-br):** Integração para manipulação do Google Calendar.
- **[BcryptJS](https://github.com/dcodeIO/bcrypt.js):** Criptografia e hashing seguro de senhas.
- **[Zod](https://zod.dev/):** Validação de formulários e dados de entrada.

## Guia de Instalação e Execução via Docker

### 1. **Pré-requisitos**
- **Node.js**
- **Docker & Docker Compose**

### 2. Configuração Inicial
Clone o repositório:
```
git clone https://github.com/JRodriguesDev/TaskFlow.git
cd TaskFlow
```

### 3. Configuração das Variáveis de Ambiente (.env)
Crie um arquivo ``.env`` na raiz do projeto com as chaves necessárias:
```
# --- Banco de Dados (PostgreSQL via Docker) ---
POSTGRES_USER=root
POSTGRES_PASSWORD=sua_senha_aqui
POSTGRES_DB=taskflow
DATABASE_URL="postgres://root:<sua_senha_aqui>@taskflow-db:5432/taskflow"

# --- Autenticação (Auth.js) ---
AUTH_SECRET="sua_chave_secreta_aqui"
AUTH_URL="http://localhost:3000"

# --- Integrações Google OAuth & Calendar API ---
AUTH_GOOGLE_ID="seu_google_client_id"
AUTH_GOOGLE_SECRET="seu_google_client_secret"
```

### Aviso sobre as credenciais do Google (OAuth & Calendar):
- Para habilitar o login com o Google e a sincronização com o Google Calendar:
- Acesse o Google Cloud Console e crie um novo projeto.
- Ative as APIs Google OAuth 2.0 e Google Calendar API.
- Na tela de consentimento OAuth, adicione o seu e-mail como Usuário de Teste (Test User) enquanto o projeto estiver em modo de teste (Testing).
- Crie as credenciais do tipo ID do cliente OAuth 2.0 para Web, copie o Client ID e o Client Secret gerados e preencha nas variáveis AUTH_GOOGLE_ID e ``AUTH_GOOGLE_SECRET`` acima.

### 4. Executando a Aplicação
Para subir todo o ambiente (Banco PostgreSQL, execução de migrações e container da aplicação):
```
# Constrói as imagens (se houver alterações) e sobe os containers do projeto
npm run compose:up

# Inicia os containers já construídos anteriormente (inicialização mais rápida)
npm run compose:start
```

