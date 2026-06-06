# Documentação de APIs - DEVMovies

## 📌 APIs Utilizadas

Este documento descreve todas as APIs externas usadas pelo DEVMovies.

## 1️⃣ IMDB Top 100 Movies API

### Informações Básicas

- **Provedor:** RapidAPI
- **Host:** `imdb-top-100-movies.p.rapidapi.com`
- **Descrição:** Fornece top 100 filmes do IMDB com ratings e metadados
- **Rate Limit:** ✅ Generoso (verifique plano)
- **Status:** ✅ Em uso

### Endpoints

#### GET /

Retorna lista dos top 100 filmes

**URL:**
```
https://imdb-top-100-movies.p.rapidapi.com/
```

**Parâmetros:** Nenhum

**Headers Obrigatórios:**
```
X-RapidAPI-Key: YOUR_API_KEY
X-RapidAPI-Host: imdb-top-100-movies.p.rapidapi.com
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "rank": 1,
    "rankUpDown": "+0",
    "title": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "image": "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlYTAwYzAtMDU3...",
    "year": 1994,
    "genre": ["Drama"],
    "rating": 9.3,
    "imdbid": "tt0111161"
  },
  {
    "id": 2,
    "rank": 2,
    "rankUpDown": "+0",
    "title": "The Dark Knight",
    "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests to fight injustice.",
    "image": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@...",
    "year": 2008,
    "genre": ["Action", "Crime", "Drama"],
    "rating": 9.0,
    "imdbid": "tt0468569"
  }
]
```

**Campos:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Number | ID único do filme |
| `rank` | Number | Posição no ranking (1-100) |
| `rankUpDown` | String | Mudança de posição |
| `title` | String | Título do filme |
| `description` | String | Sinopse |
| `image` | String | URL da imagem do poster |
| `year` | Number | Ano de lançamento |
| `genre` | Array<String> | Gêneros |
| `rating` | Number | Rating IMDB (0-10) |
| `imdbid` | String | ID IMDB (ex: tt0111161) |

**Exemplo de Requisição:**
```javascript
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.VITE_IMDB_API_KEY,
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
};

fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

**Possíveis Erros:**

| Código | Significado | Solução |
|--------|------------|---------|
| 403 | API Key inválida | Verifique `.env` |
| 429 | Rate limit excedido | Aguarde ou implemente cache |
| 503 | Serviço indisponível | Tente novamente |
| 504 | Gateway timeout | Aumentar timeout |

### Implementação em DEVMovies

**Arquivo:** `scripts/index.js`

```javascript
const IMDB_URL = 'https://imdb-top-100-movies.p.rapidapi.com/';

async function fetchMovies() {
    try {
        const response = await fetch(IMDB_URL, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.VITE_IMDB_API_KEY,
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        throw error;
    }
}
```

---

## 2️⃣ Deezer API

### Informações Básicas

- **Provedor:** RapidAPI (Deezer)
- **Host:** `deezerdevs-deezer.p.rapidapi.com`
- **Descrição:** Informações sobre música e artistas
- **Status:** ⚠️ Verificar uso

### Endpoints

#### GET /infos

Obtém informações gerais da API

**URL:**
```
https://deezerdevs-deezer.p.rapidapi.com/infos
```

**Resposta:**
```json
{
  "nb_album": 1000000,
  "nb_artist": 1000000,
  "nb_tracks": 1000000,
  "nb_playlist": 1000000
}
```

**Nota:** Esta API pode ser usada futuramente para seção de música/áudio.

---

## 3️⃣ APIs Planejadas (Futuro)

### TMDB - The Movie Database API

**Uso:** Filmes e séries mais detalhadas

**Docs:** https://www.themoviedb.org/settings/api

### MyAnimeList API (Unofficial)

**Uso:** Seção de animes com mais detalhes

**Docs:** https://myanimelist.net/

### YouTube API

**Uso:** Trailers e clips

**Docs:** https://developers.google.com/youtube/v3

---

## 🔐 Segurança e Boas Práticas

### ✅ Fazer

```javascript
// 1. Usar .env para API keys
const apiKey = process.env.VITE_IMDB_API_KEY;

// 2. Ter headers centralizados
function getHeaders() {
    return {
        'X-RapidAPI-Key': process.env.VITE_IMDB_API_KEY,
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    };
}

// 3. Implementar erro handling
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();
} catch (error) {
    // Tratar erro
}

// 4. Usar timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 10000);
```

### ❌ Não Fazer

```javascript
// ❌ NUNCA hardcode API keys
const apiKey = 'abc123'; // INSEGURO!

// ❌ NUNCA exponha em console
console.log('Key:', process.env.VITE_IMDB_API_KEY);

// ❌ NUNCA confie cegamente em resposta
const data = await response.json(); // E se falhar?

// ❌ NUNCA ignore rate limits
// Sem cache, sem throttling, sem retry
```

---

## 📊 Rate Limiting

### Estratégia de Rate Limit

**Implementação:**
```javascript
// Cache simples
const cache = {};

async function fetchWithCache(url, ttl = 3600000) { // 1 hora
    if (cache[url] && Date.now() - cache[url].time < ttl) {
        console.log('Using cache');
        return cache[url].data;
    }
    
    const data = await fetch(url);
    cache[url] = { data, time: Date.now() };
    return data;
}

// Throttling
let lastRequest = 0;
const minInterval = 1000; // 1 segundo entre requisições

async function throttledFetch(url) {
    const now = Date.now();
    if (now - lastRequest < minInterval) {
        await new Promise(r => 
            setTimeout(r, minInterval - (now - lastRequest))
        );
    }
    lastRequest = Date.now();
    return fetch(url);
}

// Exponential Backoff para retry
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fetch(url);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(r => 
                setTimeout(r, Math.pow(2, i) * 1000)
            );
        }
    }
}
```

---

## 📈 Monitoramento de API

### Métricas a Rastrear

1. **Taxa de Sucesso:** % de requisições bem-sucedidas
2. **Latência:** Tempo médio de resposta
3. **Rate Limits:** Requisições restantes
4. **Erros:** Tipos e frequência de erros
5. **Cache Hit Rate:** % de cache hits

### Implementação de Logging

```javascript
function logApiCall(method, url, status, duration) {
    console.log(`[API] ${method} ${url} - ${status} - ${duration}ms`);
    
    // Enviar para analytics (futuro)
    // analytics.track('api_call', {
    //     method, url, status, duration
    // });
}
```

---

## 🔄 Fluxo de Requisição Típica

```
┌─────────────────────────────────┐
│ Client Component                 │
├─────────────────────────────────┤
│ fetchMovies()                   │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Check Cache                     │
│ Cache HIT? → Return cached data │
└────────────────┬────────────────┘
                 │ Cache MISS
                 ▼
┌─────────────────────────────────┐
│ Check Rate Limit                │
│ OK? → Continue                  │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Prepare Request                 │
│ Set headers, timeout, etc       │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Send HTTP Request               │
│ GET /api/endpoint               │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Receive Response                │
│ Success? Error? Timeout?        │
└────────────────┬────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
Success      Retry      Throw Error
  │            │            │
  └────┬───────┴────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Parse Response                  │
│ JSON.parse()                    │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Store in Cache                  │
│ With TTL                        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Return Data                     │
│ To Component                    │
└─────────────────────────────────┘
```

---

## 📚 Recursos Úteis

- [RapidAPI Docs](https://docs.rapidapi.com/)
- [Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Última atualização:** Junho 2026  
**Próxima revisão:** Julho 2026
