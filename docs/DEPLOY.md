# Deploy e ambientes

## Railway (produção)

1. Crie um serviço PostgreSQL no projeto Railway.
2. Conecte o serviço da aplicação ao repositório GitHub e selecione a branch `main`.
3. Configure `DATABASE_URL` usando a referência fornecida pelo PostgreSQL.
4. Configure `AUTH_SECRET` com um valor aleatório forte e `NEXTAUTH_URL` com o domínio HTTPS público.
5. Opcionalmente defina `ADMIN_EMAIL` e `ADMIN_PASSWORD`, abra um shell uma única vez e execute `npm run db:seed`; remova `ADMIN_PASSWORD` depois.
6. Faça o deploy. O `railway.toml` roda `npx prisma migrate deploy` no pre-deploy, inicia com `npm run start` e verifica `/api/health`.

O deploy nativo Nixpacks foi escolhido para produção pela integração direta, menor manutenção e cache de build do Railway. O Dockerfile é a alternativa portátil e deve continuar sendo validado.

## Ambientes

Mantenha projetos/serviços e bancos separados:

- **Development:** `.env` local e banco descartável local;
- **Staging (opcional):** branch controlada, domínio e banco próprios;
- **Production:** branch `main`, banco de produção e acesso restrito.

Copie apenas os nomes das variáveis entre ambientes, nunca seus valores. Proteja `main` no GitHub exigindo sucesso do workflow CI e revisão de pull request.

## GitHub inicial

Se o repositório remoto ainda não existir:

```bash
git init
git add .
git commit -m "chore: initialize project"
git branch -M main
gh repo create 3d-print-manager --private --source=. --remote=origin --push
```

Sem GitHub CLI, crie o repositório vazio na interface, copie a URL real e execute:

```bash
git remote add origin URL_REAL_DO_REPOSITORIO
git push -u origin main
```

Não use uma URL inventada nem inclua tokens na URL do remote.
