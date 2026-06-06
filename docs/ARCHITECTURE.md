# Arquitetura de DEVMovies

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    APRESENTAÇÃO                      │
│  (HTML, CSS, DOM Manipulation)                      │
├─────────────────────────────────────────────────────┤
│                   LÓGICA DE NEGÓCIO                  │
│  (Scripts: movies.js, api.js, etc)                  │
├─────────────────────────────────────────────────────┤
│                   COMUNICAÇÃO                        │
│  (Fetch API, HTTP Requests)                         │
├─────────────────────────────────────────────────────┤
│                   SERVIÇOS EXTERNOS                  │
│  (IMDB API, Deezer API, etc)                        │
└─────────────────────────────────────────────────────┘
```

## 🏗️ Arquitetura em Camadas

### Camada 1: Apresentação (Presentation Layer)

**Responsabilidade:** Renderizar UI e gerenciar interações do usuário

**Arquivos:**
- `index.html` - Estrutura HTML
- `movies.html`, `series.html`, etc - Páginas específicas
- `styles/` - CSS styling
- DOM manipulation nos scripts

**Padrão:**
```javascript
// ✅ Separar UI da lógica
function updateUI(data) {
    const element = document.querySelector('.content');
    element.innerHTML = renderTemplate(data);
}

// ❌ Evitar misturar lógica com UI
document.querySelector('.btn').onclick = () => {
    fetch(url).then(r => r.json())
        .then(d => document.querySelector('.content').innerHTML = d);
}
```

### Camada 2: Lógica de Negócio (Business Logic Layer)

**Responsabilidade:** Implementar regras de negócio e processar dados

**Arquivos:**
- `scripts/movies.js`, `scripts/index.js`, etc

**Exemplos:**
```javascript
// Transformar dados da API
function processMovies(rawData) {
    return rawData
        .filter(m => m.rating >= 7)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 20);
}

// Validação
function validateUserInput(input) {
    if (!input || input.trim().length === 0) {
        throw new Error('Input cannot be empty');
    }
    return input.trim();
}
```

### Camada 3: Comunicação (Communication Layer)

**Responsabilidade:** Gerenciar requisições HTTP e respostas

**Arquivo:**
- `scripts/api.js`

**Padrão:**
```javascript
// Wrapper centralizado para API
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                ...getApiHeaders(),
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        logError('API call failed', error);
        throw error;
    }
}
```

### Camada 4: Serviços Externos (External Services)

**Responsabilidade:** Prover dados via APIs terceirizadas

**Serviços:**
- IMDB Top 100 Movies API
- Deezer API
- (Futuro: TMDB, MyAnimeList)

## 🔄 Fluxo de Dados

### Exemplo: Carregar Filmes

```
┌─────────────┐
│ User Action │ "Clica em Movies"
└──────┬──────┘
       │
       ▼
┌──────────────────────────────┐
│ DOMContentLoaded Event       │ index.js ouve evento
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Fetch Movies from API        │ api.js faz chamada
│ GET /imdb-api/movies         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Parse JSON Response          │ Converte resposta
│ [movie1, movie2, ...]        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Transform Data               │ movies.js processa
│ Sort, Filter, etc            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Render UI                    │ Cria HTML do DOM
│ Insert cards into page       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ User sees Movies             │
│ ✅ Page loaded successfully  │
└──────────────────────────────┘
```

## 📦 Componentes

### Componentes Atuais

#### 1. **API Module** (`scripts/api.js`)
```javascript
// Responsabilidades:
- Gerenciar headers de autenticação
- Fazer requisições HTTP
- Tratar erros de rede
- Cache de respostas (futuro)
- Rate limiting (futuro)

// Exports:
- fetchFromAPI(url, options)
- getApiHeaders()
```

#### 2. **Movies Module** (`scripts/movies.js`)
```javascript
// Responsabilidades:
- Buscar filmes da API
- Transformar dados
- Renderizar cards
- Gerenciar paginação

// Exports:
- fetchMovies()
- renderFilms(films)
- createFilmCard(film)
```

#### 3. **Series Module** (`scripts/series.js`)
```javascript
// Similar a movies, mas para séries
```

#### 4. **Index/Home Module** (`scripts/index.js`)
```javascript
// Responsabilidades:
- Carregar dados de múltiplas APIs
- Mostrar destaques
- Gerenciar navegação
```

## 🔌 Padrões de Design

### 1. Module Pattern

```javascript
// ✅ Encapsular funcionamento
const moviesModule = (() => {
    // Private
    const apiUrl = 'https://api.example.com/movies';
    
    function fetchFromApi() {
        // ...
    }
    
    // Public API
    return {
        getMovies() {
            return fetchFromApi();
        }
    };
})();

// Uso
moviesModule.getMovies();
```

### 2. Factory Pattern (Futuro)

```javascript
// Criar diferentes tipos de components
function createCard(type) {
    if (type === 'movie') {
        return new MovieCard();
    } else if (type === 'series') {
        return new SeriesCard();
    }
}
```

### 3. Observer Pattern (Futuro)

```javascript
// Notificar quando dados mudam
const dataStore = {
    listeners: [],
    subscribe(callback) {
        this.listeners.push(callback);
    },
    notify(data) {
        this.listeners.forEach(cb => cb(data));
    }
};
```

## 🎯 Decisões Arquiteturais

### ADR-001: Por que Vanilla JavaScript?

**Status:** Aceita

**Contexto:** Projeto pode ser modernizado com frameworks

**Decisão:** Começar com vanilla JS para entender fundamentals

**Consequências:**
- ✅ Sem overhead de framework
- ✅ Aprendizado profundo
- ❌ Mais verboso
- ⚠️ Será refatorado para React/Vue

### ADR-002: Separação HTML/CSS/JS

**Status:** Aceita

**Decisão:** Manter separação clara de concerns

**Implementação:**
- HTML em `*.html` files
- CSS em `styles/` pasta
- JS em `scripts/` pasta

**Benefício:** Fácil de entender e manter

### ADR-003: Centralizar API Calls

**Status:** Aceita

**Decisão:** Todo acesso à API através de `api.js`

**Benefício:**
- ✅ Erro handling centralizado
- ✅ Fácil adicionar cache/retry
- ✅ Segurança (não há hardcoding em múltiplos lugares)

### ADR-004: Usar .env para Secrets

**Status:** Crítico

**Decisão:** Nunca commitar API keys

**Implementação:**
- `.env` para valores locais
- `.env.example` como template
- GitHub Secrets para CI/CD

## 🔒 Considerações de Segurança

### Problemas Atuais

🔴 **CRÍTICO:**
- API keys hardcoded nos scripts

🟡 **ALTO:**
- XSS vulnerability em renderização HTML
- CSRF sem tokens
- Sem input validation

### Mitigações

```javascript
// ✅ Sanitizar HTML
function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

// ✅ Validar entrada
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ✅ Usar template literals com cuidado
const userInput = document.querySelector('input').value;
// ❌ Ruim: html = `<div>${userInput}</div>`;
// ✅ Bom: crear elemento e usar textContent
```

## 📊 Escalabilidade

### Limitações Atuais

- ⚠️ Sem caching (refetch todo reload)
- ⚠️ Sem lazy loading
- ⚠️ Rate limits de API
- ⚠️ Sem compressão de assets

### Plano de Melhoria

**Q3 2026:**
- Implementar cache local
- Lazy loading de imagens
- Rate limit handling

**Q4 2026:**
- Service Worker para offline
- Bundle optimization
- CDN para assets

**Q1 2027:**
- Backend cache layer
- Database for user data
- Microservices

## 🧪 Testabilidade

### Estrutura para Testes

```javascript
// Exportar functions para testes
export function processMovies(data) {
    // Pura, sem side effects
    return data.filter(m => m.rating >= 7);
}

export function renderMovies(movies) {
    // Com side effects (DOM manipulation)
}

// Testes
describe('processMovies', () => {
    it('should filter movies by rating', () => {
        const input = [
            { rating: 8 },
            { rating: 6 },
            { rating: 9 }
        ];
        const result = processMovies(input);
        expect(result).toHaveLength(2);
    });
});
```

## 📈 Performance Considerations

### Bundle Size
- Minimizar JavaScript
- Lazy load scripts
- CSS critical inline

### Network
- Compressão gzip
- Cache headers
- API request batching

### Rendering
- Pagination ao invés de carregar tudo
- Debounce de event listeners
- Virtualization para listas longas

## 🔄 Fluxo de Ciclo de Vida

```
App Load
   │
   ▼
Load HTML/CSS
   │
   ▼
Parse JavaScript
   │
   ▼
DOMContentLoaded Event
   │
   ▼
Fetch Data from APIs
   │
   ▼
Transform Data
   │
   ▼
Render to DOM
   │
   ▼
User Interaction
   │
   ▼
Update DOM / Fetch New Data
   │
   ▼
[Loop back to User Interaction]
```

## 📝 Documentação de Código

### JSDoc Pattern

```javascript
/**
 * Busca filmes da API IMDB
 * @async
 * @function fetchMovies
 * @returns {Promise<Array<Object>>} Array de objetos de filmes
 * @throws {Error} Se a requisição falhar
 * 
 * @example
 * const movies = await fetchMovies();
 * console.log(movies[0].title); // "The Shawshank Redemption"
 */
async function fetchMovies() {
    // ...
}
```

---

**Última atualização:** Junho 2026
**Próxima revisão:** Julho 2026
