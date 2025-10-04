# ToDo App — Frontend (Next.js)

Aplicação de gerenciamento de tarefas com autenticação e CRUD completo.

---

## Stack

- **Framework:** Next.js 15 + React 19 + TypeScript (Turbopack)
- **Styling:** Tailwind CSS v4, shadcn/ui (Radix), tailwindcss-animate
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios com interceptors
- **Auth:** JWT (cookies)
- **UX:** Sonner (toasts), ícones Lucide

---

## Arquitetura (resumo)

```
.
├── app/                # App Router (páginas e layouts)
├── core/               # API, interceptors, contexts (ex.: AuthContext), rotas
├── features/           # Domínios (ex.: auth, tasks)
├── shared/             # UI (shadcn), lib/utils, types/models, hooks
└── public/             # Assets estáticos
```

---

## Variáveis de Ambiente

Crie **.env.local** na raiz do frontend:

```env
# URL base do backend (NestJS)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> Ajuste conforme onde sua API estiver rodando.

---

## Como rodar (Desenvolvimento)

```bash
git clone https://github.com/mpbt11/to-do-app.git
cd to-do-app

npm install
npm run dev
# abre http://localhost:3000
```

---

## Build e execução (Produção local)

```bash
npm install
npm run build
npm run start
```

---

## Scripts (package.json)

```bash
npm run dev    
npm run build  
npm run start  
npm run lint   
```

---

## Funcionalidades (Frontend)

- Login e Cadastro (JWT)
- Páginas protegidas
- CRUD de tarefas (criar, listar, editar, excluir)
- Validação com Zod e feedback com toasts
- Layout responsivo com shadcn/ui + Tailwind

---

## Observações

- Certifique-se de que o **backend** esteja acessível pela URL definida em `NEXT_PUBLIC_API_URL`.
- Se alterar a porta/host do backend, atualize o `.env.local` e reinicie o frontend.
