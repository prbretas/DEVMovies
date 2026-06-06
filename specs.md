# DEVMovies - Especificações Técnicas

## 1. Arquitetura Geral

```
┌─────────────────────────────────────────┐
│         Frontend (HTML/CSS/JS)          │
├─────────────────────────────────────────┤
│  ├─ index.html (Home)                   │
│  ├─ movies.html (Filmes)                │
│  ├─ series.html (Séries)                │
│  ├─ animes.html (Animes)                │
│  ├─ games.html (Jogos)                  │
│  └─ tvonline.html (TV Online)           │
├─────────────────────────────────────────┤
│         API Communication Layer         │
├─────────────────────────────────────────┤
│  ├─ IMDB API                            │
│  ├─ Deezer API                          │
│  ├─ TMDB API (futuro)                   │
│  └─ MyAnimeList API (futuro)            │
└─────────────────────────────────────────┘
```

## 2. Estrutura de Diretórios (Proposta)

```
DEVMovies/
├── docs/
│   ├── API.md              # Documentação de APIs
│   ├── ARCHITECTURE.md     # Arquitetura detalhada
│   ├── DEPLOYMENT.md       # Guia de deployment
│   └── TESTING.md          # Estratégia de testes
├── src/
│   ├── components/         # Componentes reutilizáveis (futuro)
│   ├── utils/              # Utilitários
│   │   ├── api.js          # Chamadas de API
│   │   ├── cache.js        # Cache local
│   │   └── constants.js    # Constantes
│   ├── styles/             # Estilos (atual)
│   └── scripts/            # Scripts (atual)
├── tests/
│   ├── unit/               # Testes unitários
│   ├── integration/        # Testes de integração
│   ├── e2e/                # Testes end-to-end
│   └── fixtures/           # Dados para testes
├── .github/
│   └── workflows/          # CI/CD pipelines
├── .env.example            # Variáveis de ambiente exemplo
├── .gitignore              # Arquivo de ignorar
├── product.md              # Este documento
├── specs.md                # Especificações
├── steering.md             # Direcionamento
└── package.json            # Dependências (npm)
```

## 3. Componentes Principais

### 3.1 Páginas HTML

| Página | Propósito | Status |
|--------|-----------|--------|
| `index.html` | Homepage com navegação | ✅ Ativo |
| `movies.html` | Catálogo de filmes | ✅ Ativo |
| `series.html` | Catálogo de séries | ✅ Ativo |
| `animes.html` | Catálogo de animes | ✅ Ativo |
| `games.html` | Catálogo de jogos | ✅ Ativo |
| `tvonline.html` | Conteúdo de TV | ✅ Ativo |

### 3.2 Scripts JavaScript

| Script | Funcionalidade | Prioridade |
|--------|-----------------|-----------|
| `api.js` | Gerenciamento de requisições API | 🔴 CRÍTICA |
| `index.js` | Lógica da homepage | 🟡 ALTA |
| `movies.js` | Lógica de filmes | 🟡 ALTA |
| `series.js` | Lógica de séries | 🟡 ALTA |
| `animes.js` | Lógica de animes | 🟡 ALTA |
| `games.js` | Lógica de jogos | 🟡 ALTA |
| `tvonline.js` | Lógica de TV | 🟡 ALTA |

### 3.3 Estilos CSS

| Arquivo | Escopo | Notas |
|---------|--------|-------|
| `reset.css` | Reset global | Normalização |
| `common-styles/common.css` | Estilos compartilhados | Cores, tipografia |
| `index.css` | Página inicial | Específico da home |
| `movies.css` | Página de filmes | Grid responsivo |
| `series.css` | Página de séries | Grid responsivo |
| `animes.css` | Página de animes | Grid responsivo |
| `games.css` | Página de jogos | Grid responsivo |
| `tvonline.css` | Página de TV | Grid responsivo |

## 4. Especificações de API

### 4.1 IMDB Top 100 Movies API

**Endpoint:** `https://imdb-top-100-movies.p.rapidapi.com/`

**Método:** GET

**Headers Requeridos:**
```javascript
{
  'X-RapidAPI-Key': 'YOUR_API_KEY',
  'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
}
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "rank": 1,
    "title": "The Shawshank Redemption",
    "description": "...",
    "image": "https://...",
    "year": 1994,
    "genre": ["Drama"],
    "rating": 9.3
  }
]
```

### 4.2 Deezer API

**Endpoint:** `https://deezerdevs-deezer.p.rapidapi.com/`

**Método:** GET

**Status:** ⚠️ Atualmente não utilizada (revisar)

## 5. Variáveis de Ambiente

```env
# API Keys (NUNCA commitar!)
VITE_IMDB_API_KEY=your_key_here
VITE_DEEZER_API_KEY=your_key_here
VITE_TMDB_API_KEY=your_key_here

# API Hosts
VITE_IMDB_HOST=imdb-top-100-movies.p.rapidapi.com
VITE_DEEZER_HOST=deezerdevs-deezer.p.rapidapi.com

# Ambiente
VITE_ENV=development
VITE_DEBUG=true
```

## 6. Requisitos de Performance

| Métrica | Alvo | Atual |
|---------|------|-------|
| First Contentful Paint (FCP) | < 1.5s | ? |
| Largest Contentful Paint (LCP) | < 2.5s | ? |
| Time to Interactive (TTI) | < 3.5s | ? |
| Cumulative Layout Shift (CLS) | < 0.1 | ? |
| Bundle Size | < 100KB | ? |

## 7. Requisitos de Compatibilidade

### Navegadores Suportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Android 90+

### Resoluções de Tela
- Desktop: 1920x1080 e acima
- Tablet: 768x1024
- Mobile: 320x568 e acima

## 8. Segurança

### Issues Atuais
🔴 **CRÍTICO**: API Keys hardcoded nos scripts
🔴 **CRÍTICO**: Sem validação de entrada do usuário
🟡 **ALTO**: Sem HTTPS enforcement
🟡 **ALTO**: Sem rate limiting

### Medidas Necessárias
- [ ] Mover keys para `.env`
- [ ] Implementar validação XSS
- [ ] Adicionar CSP headers
- [ ] Rate limiting no lado do cliente
- [ ] Sanitização de HTML dinâmico

## 9. SEO

### Meta Tags Necessárias
- [ ] Open Graph (og:title, og:image, etc)
- [ ] Twitter Card
- [ ] Structured Data (Schema.org)
- [ ] Sitemap.xml
- [ ] robots.txt

## 10. Analytics

### Eventos a Rastrear
- Pageviews
- Cliques em conteúdo
- Busca/filtros utilizados
- Tempo de permanência
- Taxa de rejeição por seção

---

*Última atualização: Junho 2026*
