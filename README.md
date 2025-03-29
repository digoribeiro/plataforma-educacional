# 📚 Plataforma Educacional

Este projeto implementa um sistema completo de autenticação para plataformas educacionais, com login social (Google).

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no [Resend](https://resend.com) (para envio de e-mails)
- Credenciais do Google OAuth

### Instalação

### 1. **Renomeie o arquivo de ambiente**:
   ```env .env```

### 2. Instale as dependências:
```npm install```

### 3. Inicie o banco de dados
```npx prisma migrate dev --name init```

### 4. Inicie o servidor:
```npm run dev```


### Estrutura básica do projeto
```
plataforma-educacional/
├── .env                    # Variáveis de ambiente
├── prisma/
│   └── schema.prisma       # Modelagem do banco
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   └── dashboard/      # Área logada
│   ├── lib/
│   │   ├── auth.ts         # Config NextAuth
│   │   └── prisma.ts       # Conexão DB
│   └── components/         # Componentes UI
├── middleware.ts           # Controle de acesso
└── package.json
```

### Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
