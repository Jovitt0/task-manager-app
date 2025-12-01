# 📋 Gerenciador de Tarefas

Um aplicativo moderno e responsivo de gerenciamento de tarefas construído com React, TypeScript, tRPC e MySQL.

![Preview](https://img.shields.io/badge/Status-Ativo-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)

## ✨ Funcionalidades

- ✅ **Autenticação de Usuários** - Sistema de login seguro com Manus OAuth
- ✅ **CRUD Completo** - Criar, ler, atualizar e deletar tarefas
- ✅ **Edição Inline** - Edite tarefas diretamente na lista
- ✅ **Filtros** - Visualize todas, ativas ou concluídas
- ✅ **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Atualizações Otimistas** - Interface rápida e responsiva
- ✅ **Testes Automatizados** - Cobertura de testes com Vitest

## 🛠️ Tecnologias

### Frontend
- **React 19** - Biblioteca UI moderna
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Estilização utilitária
- **Wouter** - Roteamento leve
- **tRPC** - Type-safe API calls
- **shadcn/ui** - Componentes UI acessíveis

### Backend
- **Express 4** - Servidor web
- **tRPC 11** - Type-safe API
- **Drizzle ORM** - Type-safe database queries
- **MySQL** - Banco de dados relacional
- **Manus OAuth** - Autenticação

### Ferramentas
- **Vite** - Build tool rápido
- **Vitest** - Framework de testes
- **pnpm** - Gerenciador de pacotes

## 🚀 Como Executar

### Pré-requisitos
- Node.js 22+
- pnpm 10+
- MySQL 8+

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Jovitt0/task-manager-app.git
cd task-manager-app
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
DATABASE_URL=mysql://user:password@localhost:3306/tasks_db
JWT_SECRET=seu_secret_aqui
# ... outras variáveis necessárias
```

4. Execute as migrações do banco de dados:
```bash
pnpm db:push
```

5. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

6. Acesse http://localhost:3000

## 🧪 Testes

Execute os testes automatizados:
```bash
pnpm test
```

## 📁 Estrutura do Projeto

```
task-manager-app/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── lib/           # Utilitários e configurações
│   │   └── App.tsx        # Componente raiz
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # Rotas tRPC
│   ├── db.ts              # Queries do banco de dados
│   └── *.test.ts          # Testes unitários
├── drizzle/               # Schema e migrações do banco
│   └── schema.ts          # Definição das tabelas
└── shared/                # Código compartilhado
```

## 🎨 Capturas de Tela

### Landing Page
Interface moderna e convidativa com informações sobre o app.

### Lista de Tarefas
Visualize, edite e gerencie suas tarefas com facilidade.

### Responsivo
Design adaptável para todos os tamanhos de tela.

## 🔒 Segurança

- Autenticação via OAuth
- Sessões seguras com JWT
- Validação de dados com Zod
- Proteção contra SQL Injection (Drizzle ORM)
- HTTPS obrigatório em produção

## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Desenvolvido com ❤️ usando Manus AI

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
