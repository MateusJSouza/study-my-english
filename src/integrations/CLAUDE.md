## Integrações do Projeto

Esta pasta concentra integrações com serviços externos usadas pelo projeto **study-my-english**.  
Atualmente, o foco principal é a integração com o **Supabase**.

---

## Estrutura

Pasta: `src/integrations/`

Subpastas principais:

- `supabase/`
  - `client.ts` – criação do cliente `supabase-js` tipado.
  - `types.ts` – tipos gerados automaticamente a partir do schema do banco de dados.

---

## Integração: Supabase

Pasta: `src/integrations/supabase/`

### `types.ts`

- **Responsabilidade**: definir todos os tipos TypeScript derivados do schema do Supabase.
- O arquivo é **gerado automaticamente** e **não deve ser editado manualmente**.
- Tipos importantes:
  - `Database` – representa todo o schema (schemas, tabelas, views, enums, funções, etc.).
  - `Tables<T>` / `TablesInsert<T>` / `TablesUpdate<T>` – helpers para tipar linhas, inserts e updates de uma tabela específica.
  - `Enums<T>` – helper para tipar valores de enums (como `proficiency_level`, `reading_type`, `app_role`).
  - `Constants` – objeto com arrays de valores possíveis para alguns enums.

#### Regenerando os tipos

Sempre que o schema do banco for alterado, é necessário regerar este arquivo:

```bash
npx supabase gen types typescript --project-id <project-id> > src/integrations/supabase/types.ts
```

- Substitua `<project-id>` pelo ID do projeto (veja em `supabase/config.toml` ou no dashboard do Supabase).
- Após regenerar:
  - Rode o TypeScript/ESLint para garantir que o código continua compilando.
  - Ajuste os usos dos tipos se houverem mudanças em tabelas/colunas.

---

### `client.ts`

- **Responsabilidade**: criar e exportar uma instância única do cliente Supabase para uso em todo o frontend.
- Importa:
  - `createClient` de `@supabase/supabase-js`.
  - `Database` de `./types` para tipar o cliente.
- Lê variáveis de ambiente:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`

#### Configuração de autenticação

O cliente é configurado com:

- `auth.storage: localStorage`
- `auth.persistSession: true` – mantém a sessão ativa entre reloads.
- `auth.autoRefreshToken: true` – renova tokens automaticamente quando necessário.

Isso significa que qualquer fluxo de login implementado no futuro poderá se apoiar neste cliente já configurado.

#### Uso típico no frontend

Exemplo simplificado de como usar o cliente diretamente (embora o ideal seja encapsular em hooks):

```ts
import { supabase } from "@/integrations/supabase/client";

async function loadReadings() {
  const { data, error } = await supabase
    .from("readings")
    .select("*")
    .order("created_at");

  if (error) throw error;
  return data;
}
```

Na prática, o projeto já centraliza o acesso em `useReadings`, mas este padrão pode ser repetido para futuras integrações.

---

## Boas práticas para novas integrações

- **Organização por serviço**:
  - Crie uma subpasta por serviço externo, por exemplo:
    - `src/integrations/stripe/`
    - `src/integrations/sendgrid/`
  - Mantenha o código específico do serviço isolado ali.

- **Tipagem forte**:
  - Sempre que possível, crie ou gere tipos TypeScript para respostas de API e modelos de dados.
  - Exemplo: imitar o padrão de `supabase/types.ts`.

- **Clientes reutilizáveis**:
  - Exporte clientes configurados (como `supabase`) e use-os via imports com alias `@/integrations/...`.
  - Evite instanciar clientes repetidamente em componentes individuais.

- **Encapsular acesso em hooks**:
  - Prefira hooks como `useReadings` para acessar dados externos.
  - Mantém a lógica de dados fora de componentes e ajuda no reuso e testes.

- **Documentar sempre**:
  - Ao adicionar um novo serviço em `src/integrations/`, atualize este arquivo:
    - Descrevendo o serviço.
    - Onde fica o cliente.
    - Como é o fluxo de autenticação (se houver).
    - Padrões recomendados de uso (hooks, helpers, etc.).

