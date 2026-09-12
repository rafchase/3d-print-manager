# Arquitetura

## Visão geral

O projeto é um monólito modular em Next.js. A interface e os Route Handlers compartilham regras de negócio TypeScript; o Prisma encapsula persistência no PostgreSQL. Essa topologia reduz custo operacional agora e mantém limites claros para extração futura.

```text
Navegador/PWA -> Next.js (UI + API + autenticação) -> Prisma -> PostgreSQL
                         |
                         +-> regras de negócio puras/testáveis
```

## Decisões

- **App Router:** páginas de servidor por padrão e componentes de cliente apenas onde necessários.
- **Autenticação:** NextAuth com credenciais, hash bcrypt e JWT. A senha nunca entra na sessão.
- **Persistência:** um singleton Prisma evita excesso de conexões em desenvolvimento. Produção deve usar o pool oferecido pelo provedor.
- **Domínio:** `Filament`, `Printer`, `PrintJob` e `Maintenance` expressam estoque e produção; valores monetários persistem como `Decimal`.
- **Precificação:** função pura independente da interface e do banco, para facilitar testes e evolução.
- **PWA:** cache mínimo do shell público; conteúdo autenticado continua network-first para evitar exposição de dados.

## Evolução recomendada

Organizar cada novo módulo em `src/modules/<nome>` quando ganhar casos de uso próprios. Operações que alterem estoque e trabalho devem usar transações Prisma. Adicionar autorização por papéis antes de permitir múltiplos operadores e observabilidade estruturada antes de escalar.
