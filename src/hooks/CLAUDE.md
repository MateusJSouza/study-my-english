## Hooks do Projeto

Este documento descreve os hooks personalizados usados no projeto **study-my-english**, sua responsabilidade e como utilizá-los.

---

## Visão Geral

Pasta: `src/hooks/`

Hooks principais:

- `useReadings` – busca e organiza todos os textos de leitura e seus exercícios a partir do Supabase.
- `useIsMobile` – detecta se a viewport atual é considerada mobile.
- `useToast` / `toast` – sistema global de toasts usado pela interface (baseado nos componentes de UI).

---

## `useReadings`

- **Arquivo**: `useReadings.ts`
- **Responsabilidade**: buscar todos os conteúdos de leitura e exercícios relacionados do Supabase e entregá-los já organizados por nível.
- **Dependências**:
  - `@tanstack/react-query` (`useQuery`) para cache e gerenciamento de estado assíncrono.
  - Cliente `supabase` de `@/integrations/supabase/client`.

### Formato dos dados

O hook expõe um objeto com os dados no formato:

- `Record<string, Reading[]>` onde a **chave** é o nível (`"A1" | "A2" | "B1" | "B2" | "C1"`) e o **valor** é uma lista de leituras daquele nível.
- Interface `Reading`:
  - `title`, `description`, `content`
  - `questions: Question[]`
  - `type?: "reading" | "vocabulary" | "fill-blanks"`
  - `vocabularyItems?: VocabularyItem[]`
  - `blankItems?: BlankItem[]`
  - `wordBank?: string[]`

Internamente o hook:

- Faz `Promise.all` para buscar, em paralelo:
  - `readings`
  - `questions_public`
  - `vocabulary_items`
  - `blank_items`
  - `word_bank`
- Agrupa os dados por `reading_id` com `Map` para montar:
  - Lista de `questions` para cada leitura.
  - Vocabulário (`vocabularyItems`) quando `type === "vocabulary"`.
  - Itens de preencher lacunas (`blankItems`) e `wordBank` quando `type === "fill-blanks"`.
- Garante a ordem dos níveis: `A1`, `A2`, `B1`, `B2`, `C1`.

### Uso típico

Exemplo simplificado de uso em um componente:

```tsx
import { useReadings } from "@/hooks/useReadings";

function ReadingPage() {
  const { data, isLoading, error } = useReadings();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Failed to load readings.</div>;

  const a1Readings = data["A1"] ?? [];

  return (
    <div>
      {a1Readings.map((reading) => (
        <div key={reading.title}>{reading.title}</div>
      ))}
    </div>
  );
}
```

---

## `useIsMobile`

- **Arquivo**: `use-mobile.tsx`
- **Responsabilidade**: indicar se a largura da tela atual é considerada “mobile”.
- **Constante principal**:
  - `MOBILE_BREAKPOINT = 768` – breakpoint em pixels.

### Como funciona

- Usa um `useState<boolean | undefined>` para armazenar o estado inicial e mudanças.
- Usa `window.matchMedia("(max-width: 767px)")` e escuta mudanças com `addEventListener("change", ...)`.
- Inicializa o valor com base em `window.innerWidth`.
- Retorna sempre um `boolean` (`true` se a viewport é menor que `768px`, `false` caso contrário).

### Uso típico

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? "p-2" : "p-8"}>
      {/* conteúdo */}
    </div>
  );
}
```

---

## `useToast` e `toast`

- **Arquivo**: `use-toast.ts`
- **Responsabilidade**: fornecer um sistema global de toasts (notificações) para o app.
- **Integração**:
  - Usa tipos `ToastProps` e `ToastActionElement` de `@/components/ui/toast`.
  - Pensado para funcionar com o componente de toaster (`<Toaster />`) da pasta `components/ui`.

### Conceitos principais

- **Limite de toasts**:
  - `TOAST_LIMIT = 1` – apenas um toast é exibido por vez.
- **Remoção automática**:
  - `TOAST_REMOVE_DELAY` controla o tempo para remoção do toast da memória.
- **Estado global**:
  - `memoryState: { toasts: ToasterToast[] }` guarda o estado global dos toasts.
  - `listeners` é uma lista de subscrições que são notificadas a cada `dispatch`.
- **Ações suportadas**:
  - `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST`.

### API

- `toast(options: Toast)`:
  - Cria um novo toast.
  - Retorna um objeto com:
    - `id`
    - `dismiss()` – fecha o toast.
    - `update(newProps)` – atualiza propriedades do toast.

- `useToast()`:
  - Hook React que:
    - Sincroniza o estado local com `memoryState`.
    - Retorna:
      - `toasts` – lista atual de toasts.
      - `toast` – função para criar um novo toast.
      - `dismiss(toastId?)` – fecha um toast específico ou todos.

### Uso típico

```tsx
import { useToast } from "@/hooks/use-toast";

function SaveButton() {
  const { toast } = useToast();

  const handleClick = () => {
    // ... lógica de salvar
    toast({
      title: "Saved",
      description: "Your progress has been saved successfully.",
    });
  };

  return <button onClick={handleClick}>Save</button>;
}
```

---

## Boas práticas ao criar novos hooks

- Mantenha a **responsabilidade única** de cada hook.
- Prefira **tipos explícitos** em vez de `any`.
- Centralize o acesso a dados externos (Supabase, APIs) em hooks dedicados (como `useReadings`).
- Ao adicionar novos hooks nesta pasta, atualize este arquivo com:
  - Nome do hook.
  - Responsabilidade.
  - Assinatura básica e exemplo de uso.

