# CLAUDE.md - English Reading Practice

## Visão Geral do Projeto

Este é um aplicativo de prática de leitura em inglês que oferece textos progressivos organizados por níveis de proficiência (A1 a C1). A aplicação permite que usuários leiam textos, façam exercícios interativos e baixem PDFs dos conteúdos.

**Tecnologias Principais:**
- React 18.3 com TypeScript
- Vite como bundler
- Supabase para backend e banco de dados
- shadcn-ui + Radix UI para componentes
- Tailwind CSS para estilização
- React Query para gerenciamento de estado assíncrono
- React Router para navegação

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn-ui (não editar diretamente)
│   ├── FillInBlanks.tsx # Exercício de preencher lacunas
│   ├── VocabularyMatch.tsx # Exercício de vocabulário
│   ├── Quiz.tsx         # Sistema de quiz
│   ├── ReadingCard.tsx  # Card de texto de leitura
│   ├── ReadingViewer.tsx # Visualizador de texto
│   └── LevelSection.tsx # Seção por nível de proficiência
├── hooks/
│   └── useReadings.ts   # Hook para buscar textos do Supabase
├── integrations/
│   └── supabase/        # Configuração e tipos do Supabase
├── pages/
│   ├── Index.tsx        # Página principal
│   └── NotFound.tsx     # Página 404
├── lib/
│   └── utils.ts         # Utilitários gerais
├── App.tsx              # Componente raiz
└── main.tsx             # Entry point
```

Além deste arquivo na raiz, existem documentações específicas em:

- `supabase/CLAUDE.md` – detalhes de banco de dados, funções e migrações do Supabase.
- `src/hooks/CLAUDE.md` – descrição dos hooks personalizados e exemplos de uso.
- `src/integrations/CLAUDE.md` – visão geral das integrações externas (especialmente Supabase).

## Padrões de Código

### Componentes React
- Use functional components com TypeScript
- Prefira hooks personalizados para lógica reutilizável
- Componentes devem ser auto-contidos e reutilizáveis
- Use nomenclatura PascalCase para componentes

### Estilização
- Use Tailwind CSS para todos os estilos
- Siga o sistema de design do shadcn-ui
- Utilize as classes de tema (primary, secondary, accent) para consistência
- Componentes dark mode devem usar a classe `dark:` quando necessário

### Gerenciamento de Estado
- React Query (`@tanstack/react-query`) para estado do servidor
- useState/useReducer para estado local
- Evite prop drilling - considere Context API se necessário

### Integração Supabase
- Todas as queries devem usar React Query
- Tipos são gerados automaticamente em `src/integrations/supabase/types.ts`
- Cliente Supabase está configurado em `src/integrations/supabase/client.ts`
- Use o hook `useReadings` como referência para novas queries

## Convenções de Nomenclatura

- **Arquivos de componentes**: PascalCase (ex: `ReadingCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useReadings.ts`)
- **Utilitários**: camelCase (ex: `utils.ts`)
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase com prefixo `I` opcional

## Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run build:dev    # Build em modo desenvolvimento
npm run lint         # Executar ESLint
npm run preview      # Preview do build de produção
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Componentes Principais

### LevelSection
Renderiza uma seção de textos por nível de proficiência (A1, A2, B1, B2, C1).

### ReadingCard
Card individual para cada texto de leitura com preview e ações.

### ReadingViewer
Visualizador completo de texto com funcionalidades de leitura e exercícios.

### Quiz, FillInBlanks, VocabularyMatch
Componentes de exercícios interativos para prática.

## Banco de Dados (Supabase)

O projeto usa Supabase para armazenar:
- Textos de leitura organizados por nível
- Exercícios e quizzes
- Vocabulário e definições

Para modificar o schema, faça alterações no Supabase Dashboard e regenere os tipos com:
```bash
npx supabase gen types typescript --project-id your-project-id > src/integrations/supabase/types.ts
```

## UI Components (shadcn-ui)

Os componentes UI em `src/components/ui/` são gerenciados pelo shadcn-ui:
- **NÃO edite diretamente** esses arquivos
- Para adicionar novos componentes: `npx shadcn-ui@latest add [component-name]`
- Para personalizar, use as variáveis CSS em `src/index.css`

## Tema e Cores

O tema é configurado em `tailwind.config.ts` e `src/index.css`:
- **Primary**: Cor principal do app
- **Secondary**: Cor secundária
- **Accent**: Cor de destaque
- **Muted**: Cores suaves para backgrounds
- Dark mode é suportado automaticamente

## Boas Práticas

1. **Performance**: Use React.memo para componentes pesados, useMemo/useCallback quando apropriado
2. **Acessibilidade**: Mantenha os componentes acessíveis (ARIA labels, keyboard navigation)
3. **Responsividade**: Teste em múltiplos tamanhos de tela
4. **TypeScript**: Sempre defina tipos, evite `any`
5. **Imports**: Use aliases `@/` para imports limpos
6. **Commits**: Mensagens descritivas em português ou inglês

## Fluxo de Desenvolvimento

1. **Nova Feature**:
   - Crie um branch a partir de `main`
   - Implemente a feature
   - Teste localmente
   - Commit e push
   - As mudanças aparecem automaticamente no Lovable

2. **Novo Componente**:
   - Se for UI base, use shadcn-ui: `npx shadcn-ui@latest add [component]`
   - Se for componente custom, crie em `src/components/`
   - Siga os padrões de nomenclatura e tipos

3. **Nova Query/Mutation**:
   - Crie um hook customizado em `src/hooks/`
   - Use React Query para cache e sincronização
   - Adicione tipos apropriados do Supabase

## Troubleshooting

### Build Fails
- Verifique tipos TypeScript: `npm run build`
- Limpe cache: `rm -rf node_modules/.vite`

### Supabase Connection Issues
- Verifique variáveis de ambiente
- Confirme credenciais no dashboard Supabase
- Teste conexão direta no browser console

### Styling Issues
- Verifique ordem de imports do CSS
- Confirme que Tailwind está compilando: `npm run dev`
- Use DevTools para inspecionar classes aplicadas

## Deploy

O projeto está integrado com Lovable e faz deploy automático:
- Push para `main` → Deploy automático
- Preview em: https://lovable.dev/projects/fe366d4d-5c4f-42de-82f0-2507e5ee82c8

Para deploy manual via Lovable:
1. Acesse o projeto no Lovable
2. Click em Share → Publish

## Recursos Externos

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [Documentação Supabase](https://supabase.com/docs)
- [shadcn-ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Query](https://tanstack.com/query/latest)

## Contato e Suporte

Para questões sobre o projeto:
- Issues: GitHub repository
- Lovable: Use o chat no dashboard do projeto

---

**Última atualização**: 2026-02-10
