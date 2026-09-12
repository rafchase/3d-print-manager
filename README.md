# 3D Print Manager

Base web para gerenciar uma operação de impressão 3D: filamentos, impressoras, trabalhos, manutenção e precificação. O projeto nasce preparado para desenvolvimento local, PWA, PostgreSQL, CI e deploy no Railway.

## Funcionalidades disponíveis

- autenticação por e-mail e senha, com hash bcrypt e sessão JWT;
- esquema de dados e migration inicial para usuários, filamentos, impressoras, trabalhos e manutenções;
- regra de precificação com material, energia, mão de obra, perdas e margem;
- endpoint `GET /api/health` com verificação do PostgreSQL;
- experiência PWA instalável e cache básico do shell;
- imagem Docker multi-stage executada por usuário não-root;
- pipeline GitHub Actions com lint, tipos, testes e build.

## Tecnologias

Next.js 16, React 19, TypeScript, PostgreSQL, Prisma 6, Tailwind CSS 4, NextAuth, PWA, Docker e Railway.

## Pré-requisitos

- Node.js 22 ou superior e npm 10 ou superior;
- PostgreSQL 15 ou superior; ou
- Docker Engine 25+ com Docker Compose v2.

## Instalação — Node local

```bash
git clone https://github.com/rafchase/3d-print-manager.git
cd 3d-print-manager
npm install
cp .env.example .env
```

Edite `.env`: gere `AUTH_SECRET` com `openssl rand -base64 32`, defina uma senha local forte em `ADMIN_PASSWORD` e configure `DATABASE_URL`. Em seguida:

```bash
npx prisma migrate dev
npm run db:seed
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Nunca versione o `.env` preenchido.

## Instalação — Docker

Copie `.env.example` para `.env`, troque `POSTGRES_PASSWORD`, `ADMIN_PASSWORD` e `AUTH_SECRET`, e execute:

```bash
docker compose up -d --build
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

O volume nomeado `postgres_data` mantém o banco entre reinicializações. O modo Node local usa a aplicação na máquina e um PostgreSQL local/remoto; o modo Docker executa aplicação e banco em containers.

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `DATABASE_URL` | sim | conexão PostgreSQL da aplicação e do Prisma |
| `AUTH_SECRET` | sim | assinatura criptográfica das sessões |
| `NEXTAUTH_URL` | sim | URL pública da aplicação |
| `ADMIN_EMAIL` | no seed | e-mail do administrador inicial |
| `ADMIN_PASSWORD` | no seed | senha inicial (mínimo de 12 caracteres) |
| `POSTGRES_USER` | no Docker | usuário do banco local |
| `POSTGRES_PASSWORD` | no Docker | senha do banco local |
| `POSTGRES_DB` | no Docker | nome do banco local |

Use bancos e variáveis distintos para development, staging e production. Nunca conecte desenvolvimento ou testes ao banco de produção.

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run lint         # análise estática
npm run typecheck    # validação TypeScript
npm test             # testes unitários
npm run build        # build de produção
npm run db:migrate   # migrations locais
npm run db:deploy    # migrations de produção
npm run db:seed      # administrador inicial
```

## PWA

Em produção, abra a aplicação em HTTPS e use “Instalar aplicativo” no navegador. O manifesto e o service worker ficam em `public/`. O cache atual cobre apenas o shell público; dados autenticados não são armazenados offline.

## Deploy no Railway

Foi escolhido o deploy nativo Node/Nixpacks: é mais simples e rápido no Railway, enquanto o Docker permanece disponível para portabilidade e desenvolvimento. O `railway.toml` executa `prisma migrate deploy` antes de iniciar e usa `/api/health` como health check. Consulte [docs/DEPLOY.md](docs/DEPLOY.md).

## Estrutura

```text
src/app/             rotas, páginas e APIs Next.js
src/components/      componentes de interface
src/lib/             autenticação, Prisma e regras de negócio
prisma/              schema, migrations e seed
public/              manifesto, ícone e service worker PWA
docs/                arquitetura, deploy e recuperação do banco
.github/workflows/   integração contínua
```

## Git e branches

Use `main` como branch estável, branches curtas como `feature/filaments` e `fix/pricing-calculation`, e Conventional Commits. Antes de integrar, execute `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`.

## Documentação adicional

- [Arquitetura](docs/ARCHITECTURE.md)
- [Deploy e ambientes](docs/DEPLOY.md)
- [Backup e restauração](docs/BACKUP.md)

## Segurança

Segredos pertencem ao `.env` local, às Variables do Railway ou aos GitHub Secrets. Nunca grave senhas, URLs reais de banco, tokens, chaves privadas ou credenciais no código, Dockerfile, Compose, README ou histórico Git.
