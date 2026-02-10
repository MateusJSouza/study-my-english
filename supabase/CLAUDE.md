## Supabase do Projeto

Este documento descreve toda a parte de Supabase usada pelo projeto **study-my-english**: banco de dados, funções, migrações e como o frontend se integra a tudo isso.

---

## Estrutura de Pastas Relacionadas ao Supabase

- `supabase/config.toml`: configuração do Supabase CLI e referência do projeto.
- `supabase/migrations/*.sql`: migrações SQL que criam/alteram o schema do banco.
- `supabase/functions/check-answers/index.ts`: função Edge usada para correção de respostas de quiz.
- `src/integrations/supabase/types.ts`: tipos TypeScript gerados a partir do schema do banco.
- `src/integrations/supabase/client.ts`: criação do cliente `supabase-js` tipado para uso no frontend.

---

## Cliente Supabase no Frontend

- O cliente é criado em `src/integrations/supabase/client.ts`:
  - Usa `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` do arquivo `.env`.
  - Configura autenticação com `localStorage`, `persistSession: true` e `autoRefreshToken: true`.
- Tipagem:
  - O tipo `Database` vem de `src/integrations/supabase/types.ts`.
  - A função `createClient<Database>(...)` garante tipagem forte em todas as queries.

### Variáveis de ambiente (frontend)

No arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

---

## Schema do Banco de Dados (`public`)

Os tipos abaixo são extraídos de `src/integrations/supabase/types.ts`. Eles refletem exatamente o schema atual do banco.

### Tabelas

- **`readings`**
  - **Campos principais**:
    - `id: string` – identificador do texto de leitura.
    - `title: string` – título do texto.
    - `description: string` – descrição/resumo.
    - `content: string` – conteúdo completo (texto).
    - `level: proficiency_level` – nível de proficiência (A1–C1).
    - `type: reading_type` – tipo de conteúdo (leitura, vocabulário, fill-blanks).
    - `created_at: string`, `updated_at: string` – timestamps.
  - **Uso**: tabela central que representa cada texto de leitura mostrado no app.

- **`questions`**
  - **Campos principais**:
    - `id: string`
    - `reading_id: string` – referência para `readings.id`.
    - `question: string` – texto da pergunta.
    - `options: string[]` – alternativas de múltipla escolha.
    - `correct_answer: number` – índice da opção correta no array `options`.
    - `created_at: string`
  - **Relacionamentos**:
    - FK `questions_reading_id_fkey` → `readings.id`.
  - **Uso**: questões de múltipla escolha associadas a um texto de leitura.

- **`blank_items`**
  - **Campos principais**:
    - `id: string`
    - `reading_id: string` – referência para `readings.id`.
    - `sentence: string` – frase com lacuna.
    - `answer: string` – resposta correta esperada.
    - `created_at: string`
  - **Relacionamentos**:
    - FK `blank_items_reading_id_fkey` → `readings.id`.
  - **Uso**: exercícios de preencher lacunas exibidos pelo componente `FillInBlanks`.

- **`vocabulary_items`**
  - **Campos principais**:
    - `id: string`
    - `reading_id: string` – referência para `readings.id`.
    - `word: string` – palavra de vocabulário.
    - `image_url: string` – URL da imagem associada à palavra.
    - `created_at: string`
  - **Relacionamentos**:
    - FK `vocabulary_items_reading_id_fkey` → `readings.id`.
  - **Uso**: vocabulário ilustrado usado nos exercícios de vocabulário.

- **`word_bank`**
  - **Campos principais**:
    - `id: string`
    - `reading_id: string` – referência para `readings.id`.
    - `word: string` – palavra integrante do “banco de palavras”.
    - `created_at: string`
  - **Relacionamentos**:
    - FK `word_bank_reading_id_fkey` → `readings.id`.
  - **Uso**: lista de palavras disponíveis para exercícios como “word bank”.

- **`user_roles`**
  - **Campos principais**:
    - `id: string`
    - `user_id: string` – ID do usuário (da tabela de auth do Supabase).
    - `role: app_role` – papel do usuário no app.
  - **Uso**: controle de papéis (admin, moderador, usuário comum). Pode ser usado junto com a função `has_role`.

### Views

- **`questions_public`** 🔒 **VIEW SEGURA**
  - **Campos principais**:
    - `id: string | null`
    - `reading_id: string | null`
    - `question: string | null`
    - `options: string[] | null`
    - `created_at: string | null`
    - ⚠️ **IMPORTANTE**: O campo `correct_answer` é **EXCLUÍDO** desta view por segurança
  - **Relacionamentos**:
    - Usa a mesma FK `questions_reading_id_fkey` → `readings.id`.
  - **Uso**: Exposição segura das questões para consumo público. Esta view permite que usuários vejam as perguntas e opções sem ter acesso às respostas corretas, prevenindo trapaça.
  - **Segurança**:
    - ✅ O campo `correct_answer` NÃO está presente nesta view
    - ✅ A tabela base `questions` tem RLS que nega SELECT direto para não-admins
    - ✅ Verificação de respostas é feita server-side via função Edge `check-answers`

---

## 🔒 Segurança de Questões e Respostas

### Problema de Segurança Resolvido

A tabela `questions` contém respostas corretas (`correct_answer`), o que poderia permitir trapaça se exposta diretamente. A arquitetura implementa múltiplas camadas de segurança:

#### 1. **View Pública Segura** (`questions_public`)
- **Definição**: Criada na migração `20260210120759_3e57b28d-edd1-4488-aa91-af110f11e08f.sql`
- **Correção**: Migração `20260210140000_fix_questions_public_view.sql` (remove `security_invoker`)
- **Campos expostos**: `id, reading_id, question, options, created_at`
- **Campo OMITIDO**: `correct_answer` (não está presente na view)
- **Acesso**: `GRANT SELECT` para `anon` e `authenticated`

```sql
-- View correta (security_definer por padrão)
CREATE VIEW public.questions_public AS
  SELECT id, reading_id, question, options, created_at
  FROM public.questions;
```

**⚠️ Problema Resolvido:** A view original tinha `security_invoker = on`, o que fazia com que ela herdasse as permissões do usuário fazendo a query. Como a tabela base tem RLS bloqueando não-admins, a view também era bloqueada. A correção remove `security_invoker`, usando `security_definer` por padrão (permissões do dono da view = superuser).

#### 2. **Row Level Security (RLS) na Tabela Base**
- **Política**: "No direct public access to questions"
- **Restrição**: SELECT direto na tabela `questions` é permitido APENAS para admins
- **Implementação**: `USING (public.has_role(auth.uid(), 'admin'))`

```sql
CREATE POLICY "No direct public access to questions"
  ON public.questions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
```

#### 3. **Validação Server-Side**
- **Função Edge**: `check-answers` (`supabase/functions/check-answers/index.ts`)
- **Fluxo seguro**:
  1. Frontend envia `questionId` e `selectedAnswer` para a função Edge
  2. Função usa `SUPABASE_SERVICE_ROLE_KEY` para acessar `correct_answer`
  3. Comparação acontece no servidor
  4. Retorna apenas `isCorrect: boolean` e `correctAnswer: number`
- **Vantagem**: Cliente nunca tem acesso direto às respostas corretas

### Como o Frontend Deve Usar

❌ **NUNCA FAÇA ISSO** (não funciona e não é seguro):
```typescript
// Isso retornará undefined para correct_answer ou dará erro
const { data } = await supabase
  .from('questions')
  .select('correct_answer')
  .eq('id', questionId);
```

✅ **FAÇA ASSIM** (seguro e correto):
```typescript
// 1. Buscar questões (sem respostas)
const { data } = await supabase
  .from('questions_public')  // Usa a view segura
  .select('*')
  .eq('reading_id', readingId);

// 2. Validar resposta via função Edge
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/check-answers`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      questionId: 'abc123',
      selectedAnswer: 2
    })
  }
);
const { isCorrect, correctAnswer } = await response.json();
```

### Manutenção e Auditoria

⚠️ **ATENÇÃO AO MODIFICAR**:
- **Nunca adicione** `correct_answer` à view `questions_public`
- **Não remova** a política RLS "No direct public access to questions"
- **Teste sempre** que modificar permissões:
  - Com usuário anon: não deve ver `correct_answer`
  - Com admin: deve ver `correct_answer`
- **Use sempre** a função Edge `check-answers` para validação

---

### Funções

- **`has_role(_role, _user_id) → boolean`**
  - **Parâmetros**:
    - `_role: app_role`
    - `_user_id: string`
  - **Retorno**: `true` se o usuário possui o papel especificado em `user_roles`, caso contrário `false`.
  - **Uso típico**: verificação de autorização em políticas RLS ou em queries específicas.

### Enums

- **`app_role`**
  - Valores: `"admin" | "moderator" | "user"`.
  - Uso: diferenciação de permissões no app.

- **`proficiency_level`**
  - Valores: `"A1" | "A2" | "B1" | "B2" | "C1"`.
  - Uso: nível de proficiência de cada leitura (`readings.level`).

- **`reading_type`**
  - Valores: `"reading" | "vocabulary" | "fill-blanks"`.
  - Uso: tipo de conteúdo da leitura (`readings.type`), usado para decidir quais exercícios exibir.

---

## Função Edge: `check-answers`

Arquivo: `supabase/functions/check-answers/index.ts`

- **Responsabilidade**: validar se a resposta enviada pelo usuário para uma questão (`questions`) está correta.
- **Entrada** (HTTP `POST`, JSON):
  - `questionId: string` – ID da questão na tabela `questions`.
  - `selectedAnswer: number` – índice selecionado pelo usuário (posição no array `options`).
- **Validações**:
  - Se `questionId` estiver vazio ou `selectedAnswer` for `null/undefined`, retorna `400` com mensagem de erro.
- **Processamento**:
  - Cria um cliente Supabase com:
    - `SUPABASE_URL`
    - `SUPABASE_SERVICE_ROLE_KEY`
  - Busca `correct_answer` na tabela `questions` para o `id` informado.
  - Compara `selectedAnswer` com `correct_answer`.
- **Resposta** (`200 OK`):
  - Corpo JSON:
    - `isCorrect: boolean` – se a alternativa enviada é correta.
    - `correctAnswer: number` – índice correto.
- **Erros**:
  - Questão não encontrada → `404`.
  - Erro interno → `500`.
- **CORS**:
  - Permite origem `*` e cabeçalhos comuns (`authorization`, `apikey`, `content-type`, etc.), facilitando chamadas diretas do frontend.

### Variáveis de ambiente (função Edge)

Definidas no próprio projeto Supabase (Dashboard ou CLI), não no `.env` do Vite:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Migrações do Banco (`supabase/migrations`)

Os arquivos `.sql` dentro de `supabase/migrations`:

- Criam e alteram:
  - Tabelas (`readings`, `questions`, `blank_items`, `vocabulary_items`, `word_bank`, `user_roles`, etc.).
  - Views (`questions_public`).
  - Funções (`has_role`).
  - Enums (`app_role`, `proficiency_level`, `reading_type`).
  - Policies de Row Level Security (RLS) e permissões relacionadas.
- Cada arquivo representa um passo de evolução do schema. Em caso de dúvidas sobre alguma coluna/política específica, consulte o SQL correspondente.

### Fluxo típico com Supabase CLI

Alguns comandos úteis (executados na pasta raiz do projeto):

```bash
# Aplicar migrações locais ao banco do projeto
supabase db push

# Resetar o banco local e reaplicar migrações
supabase db reset
```

(Esses comandos assumem que o Supabase CLI está instalado e configurado com o `config.toml` deste diretório.)

---

## Geração de Tipos TypeScript

Sempre que o schema do banco mudar (novas tabelas, colunas, enums, etc.), é importante regerar o arquivo `src/integrations/supabase/types.ts` para manter a tipagem atualizada:

```bash
npx supabase gen types typescript --project-id <project-id> > src/integrations/supabase/types.ts
```

- Substitua `<project-id>` pelo ID real do projeto (definido em `supabase/config.toml`).
- Após regerar os tipos:
  - Rode o TypeScript/ESLint para verificar se há quebras.
  - Ajuste o código do frontend conforme necessário.

---

## Boas Práticas e Dicas

- **Centralizar queries**:
  - Use hooks como `useReadings` e crie novos hooks em `src/hooks/` para cada tipo de dado (por exemplo, perguntas, vocabulário), sempre usando o cliente tipado.

- **RLS e segurança** 🔒:
  - ⚠️ **NUNCA exponha respostas corretas** diretamente ao cliente
  - Confirme políticas nas migrações sempre que expuser dados sensíveis
  - Use views (como `questions_public`) para limitar campos expostos quando necessário
  - **Sempre valide dados sensíveis server-side** via Edge Functions
  - Revise as políticas RLS após cada migração que altere permissões
  - Teste com diferentes níveis de usuário (anon, authenticated, admin)

- **Queries de questões**:
  - ✅ **Use `questions_public`** para listar questões no frontend
  - ✅ **Use função Edge `check-answers`** para validar respostas
  - ❌ **Nunca acesse `questions` diretamente** do frontend
  - ❌ **Nunca confie em validação apenas client-side**

- **Organização de funções Edge**:
  - Agrupe funções por domínio (ex.: correção de exercícios, administração, etc.)
  - Documente entrada/saída de cada função neste arquivo ou em arquivos específicos
  - Use `SUPABASE_SERVICE_ROLE_KEY` quando precisar de acesso elevado (como ler `correct_answer`)

- **Manter este documento atualizado**:
  - Sempre que criar novas tabelas, funções, enums ou Edge Functions, adicione uma breve descrição aqui
  - Documente decisões de segurança importantes

