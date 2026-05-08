# Achados Inteligentes

Projeto de site de afiliados Amazon criado com Next.js, TypeScript, Tailwind CSS e painel administrativo com Supabase para gerenciar produtos, links de afiliado, imagens, categorias, posts e comparativos.

## Stack

- Next.js 15
- React 19
- Tailwind CSS
- Dados locais em JSON para cadastro simples de produtos, categorias e posts

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm run dev
```

3. Abra `http://localhost:3000`

## Painel administrativo com Supabase

O projeto agora suporta operação real por painel em `/admin`, com login e CRUD visual.

### O que o painel gerencia

- categorias
- produtos
- posts do blog
- comparativos
- links de afiliado
- imagens por URL ou upload em bucket do Supabase

### Como configurar o Supabase

1. Crie um projeto no Supabase
2. Copie `.env.example` para `.env.local`
3. Preencha:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

4. No Supabase SQL Editor, execute o arquivo [supabase/schema.sql](</c:/Users/PC NOVO/Folder/supabase/schema.sql>)
5. No Supabase Auth, crie seu usuário administrador com e-mail e senha
6. Acesse `/admin/login`

### Produção sem fallback silencioso

Em produção, o site não usa mais conteúdo local de demonstração como fallback silencioso para páginas públicas.

Isso significa:

- se `NEXT_PUBLIC_SUPABASE_URL` ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` não estiverem configurados, o erro aparece de forma explícita
- se o conteúdo público do Supabase não estiver disponível, o site não publica produtos fictícios sem aviso

Esse comportamento evita colocar no ar links placeholder ou conteúdo de exemplo por engano.

### Bucket de imagens

O painel tenta enviar imagens para o bucket público `site-assets`.

Se quiser usar upload:

- execute o SQL do schema, que já cria o bucket se ele não existir
- ou crie manualmente no Supabase Storage um bucket público chamado `site-assets`

Se preferir, você também pode só colar URLs públicas de imagem no formulário.

## Onde inserir seus links de associado Amazon

### Pelo painel

- Acesse `/admin/produtos`
- Crie ou edite um produto
- Preencha o campo `Link de afiliado Amazon`

### Pelo fallback local

- Edite o arquivo [data/products.json](</c:/Users/PC NOVO/Folder/data/products.json>)
- Em cada produto, altere o campo `affiliateLink`
- Exemplo:

```json
{
  "name": "Fone Bluetooth SoundMax Pro",
  "affiliateLink": "https://www.amazon.com.br/dp/SEU_LINK_REAL"
}
```

## Como cadastrar novos produtos

### Opção recomendada

Use o painel em `/admin/produtos`.

### Opção fallback

Adicione um novo objeto dentro de [data/products.json](</c:/Users/PC NOVO/Folder/data/products.json>) com os seguintes campos:

```json
{
  "name": "Nome do produto",
  "slug": "nome-do-produto",
  "category": "Tecnologia",
  "categorySlug": "tecnologia",
  "image": "https://sua-imagem.jpg",
  "description": "Resumo claro do produto.",
  "benefits": ["Benefício 1", "Benefício 2"],
  "pros": ["Pró 1", "Pró 2"],
  "cons": ["Contra 1", "Contra 2"],
  "recommendedFor": "Perfil ideal de uso.",
  "affiliateLink": "https://www.amazon.com.br/dp/SEU_LINK",
  "highlightTag": "Melhor custo-benefício",
  "editorialRating": 4.7,
  "featured": true
}
```

## Como alterar nome, cores, logo e categorias

- Nome do site, menu, URL base e contatos: `utils/site.ts`
- Cores, tipografia, sombras e fundo principal: `tailwind.config.ts` e `app/globals.css`
- Categorias iniciais em fallback local: `data/categories.json`
- Categorias no modo painel: `/admin/categorias`
- Para trocar o logotipo textual por imagem, ajuste o componente `components/Header.tsx`

## Estrutura principal

```text
app/
components/
data/
utils/
public/
```

## Arquitetura de conteúdo

O site funciona em dois modos:

1. `Modo fallback`
   Usa os arquivos JSON em `data/`

2. `Modo produção com painel`
   Usa o Supabase para leitura e gravação do conteúdo

Assim você consegue desenvolver localmente e depois operar o conteúdo de forma visual, sem editar código a cada atualização.

## SEO e rastreamento

O projeto já inclui:

- metadados por página
- rotas amigáveis
- `robots.ts`
- `sitemap.ts`
- FAQ schema em artigos
- espaço para Google Analytics e Meta Pixel

Configure estas variáveis de ambiente se quiser ativar rastreamento:

```bash
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_META_PIXEL_ID=
```

## Publicação com painel

Ao publicar na Vercel:

1. conecte o repositório
2. adicione as variáveis do Supabase e de rastreamento
3. publique
4. faça login em `/admin/login`

Depois disso, novos produtos, links e posts podem ser cadastrados pelo painel, sem precisar abrir VS Code para cada ajuste.

## Publicação na Vercel

1. Suba o projeto para um repositório Git
2. Importe o repositório na Vercel
3. A Vercel detectará automaticamente Next.js
4. Configure as variáveis de ambiente, se necessário
5. Clique em deploy

## Publicação na Netlify

1. Suba o projeto para um repositório Git
2. Crie um novo site na Netlify a partir do repositório
3. Use:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Se preferir Netlify para Next.js com suporte completo, use o adaptador oficial da plataforma

## Observações importantes para Amazon Afiliados

- Não publique preços fixos no conteúdo sem mecanismo confiável de atualização
- Não copie reviews da Amazon
- Não use linguagem que sugira site oficial da Amazon
- Prefira imagens próprias, autorizadas ou compatíveis com a política do programa
- Mantenha o aviso de afiliado visível nas páginas e no rodapé informativo

## Expansão futura

O projeto está pronto para crescer com:

- CMS ou painel administrativo
- banco de dados
- autenticação
- newsletter
- páginas de landing específicas por nicho
- integração com APIs e formulários reais

Agora a base já inclui autenticação, banco e painel admin. Os próximos upgrades naturais são:

- perfis e permissões de múltiplos editores
- editor rich text
- agendamento de posts
- dashboards de cliques e conversão
- integração com automações e e-mail marketing
