# Backup e restauração do PostgreSQL

## Backup manual

Use a versão do `pg_dump` compatível com o servidor e uma URL obtida de forma segura:

```bash
pg_dump --format=custom --no-owner --no-acl --file=backup.dump "$DATABASE_URL"
```

Armazene o arquivo criptografado fora do servidor da aplicação, aplique retenção (por exemplo: 7 diários, 4 semanais e 6 mensais) e restrinja acesso. Nunca versione dumps.

## Restauração

Restaure primeiro em um banco vazio de teste:

```bash
pg_restore --clean --if-exists --no-owner --no-acl --dbname="$RESTORE_DATABASE_URL" backup.dump
```

Valide login, contagens essenciais, trabalhos e estoque antes de qualquer recuperação de produção. Uma restauração destrutiva em produção exige janela de manutenção e confirmação explícita do banco de destino.

## Railway

Verifique no plano atual do Railway se backups automáticos e point-in-time recovery estão habilitados; recursos e retenção podem variar. Mesmo quando disponíveis, mantenha uma cópia periódica independente e faça um teste documentado de restauração ao menos trimestralmente.
