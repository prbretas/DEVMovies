# Guia de Desenvolvimento - DEVMovies

## 📋 Índice

1. [Quickstart](#quickstart)
2. [Configuração do Ambiente](#configuração-do-ambiente)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
5. [Debugging](#debugging)
6. [Testes](#testes)
7. [Build & Deploy](#build--deploy)
8. [Troubleshooting](#troubleshooting)

## 🚀 Quickstart

Começar a desenvolver em 5 minutos:

```bash
# 1. Clone o repositório
git clone https://github.com/prbretas/DEVMovies.git
cd DEVMovies

# 2. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas API keys

# 3. Abra no seu editor
code .  # para VS Code

# 4. Inicie um servidor local (opcional)
# Python 3+
python -m http.server 8000

# ou Node.js
npx http-server

# 5. Abra no browser
# http://localhost:8000
```

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Git instalado
- Editor de texto (VS Code recomendado)
- Node.js 14+ (para ferramentas de desenvolvimento)
- Browser moderno

### Variáveis de Ambiente

```bash
# Crie .env na raiz
cp .env.example .env
```

Adicione suas API keys:

```env
# IMDB API
VITE_IMDB_API_KEY=sua_chave_aqui
VITE_IMDB_HOST=imdb-top-100-movies.p.rapidapi.com

# Deezer API
VITE_DEEZER_API_KEY=sua_chave_aqui
VITE_DEEZER_HOST=deezerdevs-deezer.p.rapidapi.com

# Desenvolvimento
VITE_ENV=development
VITE_DEBUG=true
```

### Extensions VS Code Recomendadas

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ritwickdey.LiveServer",
    "formulahendry.code-runner",
    "eamodio.gitlens",
    "GitKraken.gitkraken-browser-extension"
  ]
}
```

Instale com:
```bash
code --install-extension esbenp.prettier-vscode
# ... etc
```

### Setup do VS Code

Crie `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/.git": true,
    "**/.env": true,
    "**/node_modules": true
  }
}
```

## 📁 Estrutura do Projeto

### Organização Atual

```
DEVMovies/
├── index.html              # Homepage
├── movies.html             # Página de filmes
├── series.html             # Página de séries
├── animes.html             # Página de animes
├── games.html              # Página de jogos
├── tvonline.html           # Página de TV
│
├── scripts/
│   ├── api.js              # 🔴 REFATORAR: Gerencia APIs
│   ├── index.js            # Lógica homepage
│   ├── movies.js           # Lógica filmes
│   ├── series.js           # Lógica séries
│   ├── animes.js           # Lógica animes
│   ├── games.js            # Lógica jogos
│   └── tvonline.js         # Lógica TV
│
├── styles/
│   ├── reset.css           # Reset global
│   ├── index.css           # Homepage styles
│   ├── movies.css          # Filmes styles
│   ├── series.css          # Séries styles
│   ├── animes.css          # Animes styles
│   ├── games.css           # Jogos styles
│   ├── tvonline.css        # TV styles
│   └── common-styles/
│       └── common.css      # Estilos compartilhados
│
├── img/                    # Imagens do projeto
├── tests/                  # 🆕 Testes
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── docs/                   # 🆕 Documentação
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
│
├── .github/                # 🆕 GitHub config
│   └── workflows/          # CI/CD pipelines
│
├── .env.example            # 🆕 Exemplo de env
├── .gitignore              # 🆕 Ignorar arquivos
├── .prettierrc              # 🆕 Prettier config
├── .eslintrc.json          # 🆕 ESLint config
├── product.md              # 📄 Documento de produto
├── specs.md                # 📄 Especificações
├── steering.md             # 📄 Direcionamento
├── CONTRIBUTING.md         # 📄 Contribuição
├── DEVELOPMENT.md          # 📄 Este guia
└── README.md               # 📄 Overview
```

### Onde Colocar Coisas

| Tipo | Local | Exemplo |
|------|-------|---------|
| Página HTML | Raiz | `movies.html` |
| Lógica de página | `scripts/` | `scripts/movies.js` |
| Estilos de página | `styles/` | `styles/movies.css` |
| Utilitários | `scripts/utils/` | `scripts/utils/api.js` |
| Testes unitários | `tests/unit/` | `tests/unit/api.test.js` |
| Testes e2e | `tests/e2e/` | `tests/e2e/movies.test.js` |
| Dados de teste | `tests/fixtures/` | `tests/fixtures/movies.json` |
| Documentação | `docs/` | `docs/API.md` |

## 🔄 Fluxo de Desenvolvimento

### 1. Criar uma Feature

```bash
# Atualize main
git fetch origin
git checkout main
git pull origin main

# Crie uma branch
git checkout -b feature/sua-feature

# Faça alterações
# ... editar arquivos ...

# Teste localmente
npm test

# Commit
git add .
git commit -m "feat: sua descrição"

# Push
git push origin feature/sua-feature

# Abra Pull Request no GitHub
```

### 2. Estrutura de um Componente

Exemplo: Adicionando nova funcionalidade ao `movies.js`

```javascript
// scripts/movies.js

const MOVIES_API_URL = 'https://imdb-top-100-movies.p.rapidapi.com/';

/**
 * Busca filmes da API
 * @returns {Promise<Array>} Array de filmes
 * @throws {Error} Se a API falhar
 */
async function fetchMovies() {
    try {
        const response = await fetch(MOVIES_API_URL, {
            method: 'GET',
            headers: getApiHeaders(),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        throw error;
    }
}

/**
 * Renderiza filmes na página
 * @param {Array} films - Array de filmes
 */
function renderFilms(films) {
    const filmsWrapper = document.querySelector('.films');

    films.forEach(film => {
        const html = createFilmCard(film);
        filmsWrapper.insertAdjacentHTML('beforeend', html);
    });
}

/**
 * Cria HTML do card do filme
 * @param {Object} film - Dados do filme
 * @returns {string} HTML do card
 */
function createFilmCard(film) {
    return `
        <div class="film-card" data-film-id="${film.id}">
            <img 
                src="${film.image}" 
                alt="${film.title} poster" 
                class="film-card__img"
            >
            <h3 class="film-card__title">${film.title}</h3>
            <div class="film-card__year">${film.year}</div>
            <div class="film-card__genre">${film.genre.join(', ')}</div>
            <div class="film-card__description">${film.description}</div>
            <div class="film-card__rate">IMDB: ${film.rating}</div>
            <button class="film-card__favorite" aria-label="Add to favorites">❤️</button>
        </div>
    `;
}

// Init na página load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const films = await fetchMovies();
        renderFilms(films);
    } catch (error) {
        showErrorMessage('Failed to load movies');
    }
});
```

### 3. Padrão de Tratamento de Erros

```javascript
// ✅ Bom
async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${response.statusText}`
            );
        }
        
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Network error:', error);
        } else if (error instanceof SyntaxError) {
            console.error('JSON parse error:', error);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

// ❌ Ruim
fetch(url).then(r => r.json()).catch(e => console.log(e));
```

## 🐛 Debugging

### Console Logging

```javascript
// Básico
console.log('Value:', value);

// Estruturado
console.table(arrayOfObjects);

// Performance
console.time('fetch');
// ... código ...
console.timeEnd('fetch');

// Stack trace
console.trace('Trace point');

// Grupos
console.group('Movies API');
console.log('Fetching...');
console.log('Response:', response);
console.groupEnd();
```

### DevTools

1. **Console Tab**
   - Teste código JavaScript
   - Veja logs e errors
   - `debugger;` para breakpoints

2. **Network Tab**
   - Inspecione requisições API
   - Veja status, headers, payload
   - Simule throttling

3. **Performance Tab**
   - Perfil de carregamento
   - Identifique gargalos
   - Flame chart

4. **Application Tab**
   - LocalStorage
   - SessionStorage
   - Cookies

### Breakpoints

```javascript
// Breakpoint manual (se DevTools aberto)
debugger;  // Execução pausa aqui

// Breakpoint condicional
if (value === undefined) {
    debugger;  // Só para se condição é verdadeira
}
```

## 🧪 Testes

### Configuração de Testes (Futuro)

```bash
# Instale Jest
npm install --save-dev jest @babel/preset-env

# Configure
npm init jest

# Execute
npm test
```

### Estrutura de Teste

```javascript
// tests/unit/api.test.js

describe('API functions', () => {
    describe('fetchMovies', () => {
        it('should return array of movies', async () => {
            // Arrange
            const expectedMovies = [
                { id: 1, title: 'Inception' }
            ];
            
            // Act
            const result = await fetchMovies();
            
            // Assert
            expect(result).toEqual(expectedMovies);
        });

        it('should throw error on network failure', async () => {
            // Arrange
            jest.spyOn(global, 'fetch').mockRejectedValueOnce(
                new Error('Network error')
            );
            
            // Act & Assert
            await expect(fetchMovies()).rejects.toThrow('Network error');
        });
    });
});
```

### Rodando Testes

```bash
# Todos os testes
npm test

# Teste específico
npm test -- movies.test.js

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Verbose
npm test -- --verbose
```

## 📦 Build & Deploy

### Build Local

```bash
# Para testes e otimização (futuro)
npm run build

# Resultado em dist/
ls dist/
```

### Deploy no GitHub Pages

```bash
# 1. Push para main
git add .
git commit -m "feat: new feature"
git push origin main

# 2. GitHub Actions roda automaticamente
# 3. Resultado publicado em gh-pages

# Verificar status em:
# https://github.com/prbretas/DEVMovies/actions
```

### Deploy Manual

```bash
# Se necessário fazer deploy manual:

# 1. Certifique-se que está em main
git checkout main
git pull origin main

# 2. Build (se aplicável)
npm run build

# 3. Deploy (se houver script)
npm run deploy
```

## 🆘 Troubleshooting

### Problema: API Key não funciona

**Solução:**
1. Verifique se `.env` existe
2. Verifique se a chave está correta
3. Verifique se há créditos na API
4. Aguarde alguns minutos (rate limit?)

```bash
# Verificar arquivo
cat .env

# Não commit .env!
echo ".env" >> .gitignore
```

### Problema: Testes falhando

**Solução:**
```bash
# Limpe cache
npm test -- --clearCache

# Re-instale dependências
rm -rf node_modules
npm install

# Rode testes novamente
npm test
```

### Problema: Código não formata

**Solução:**
```bash
# Instale Prettier
npm install --save-dev prettier

# Formate
npx prettier --write "**/*.{js,css,html,json}"

# Configure VS Code para auto-format
# (Ver settings.json acima)
```

### Problema: Git diz "changes not staged"

**Solução:**
```bash
# Veja o que mudou
git diff

# Resete para último commit
git checkout -- arquivo.js

# Ou adicione e commit
git add arquivo.js
git commit -m "fix: message"
```

### Problema: Branch desatualizada

**Solução:**
```bash
# Atualize da origin
git fetch origin
git merge origin/main

# Ou rebase (mais limpo)
git rebase origin/main

# Se conflito, resolva e:
git rebase --continue
```

## 📞 Verificação de Saúde

Checklist antes de submeter PR:

```bash
# 1. Código limpo
npm run lint

# 2. Formatação
npm run format

# 3. Testes
npm test

# 4. Sem arquivos acidentais
git status

# 5. Commits bem formados
git log --oneline -5

# 6. Sem API keys ou secrets
git diff HEAD~1 | grep -i "api_key\|secret"

# 7. Build funciona
npm run build  # ou seu comando
```

## 📚 Recursos Adicionais

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS Tricks](https://css-tricks.com/)
- [Git Docs](https://git-scm.com/doc)
- [Figma Design](https://www.figma.com/) - Para UI

## 💡 Tips & Tricks

### VS Code Shortcuts
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+K Ctrl+C` - Comment
- `Ctrl+K Ctrl+U` - Uncomment
- `Alt+Up/Down` - Move line
- `Ctrl+Shift+D` - Debug view

### Git Aliases

```bash
# Adicione ao git config
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'restore --staged'

# Use
git st       # = git status
git co main  # = git checkout main
```

### Browser DevTools

- `F12` ou `Ctrl+Shift+I` - Abrir DevTools
- `Ctrl+Shift+C` - Inspecionar elemento
- `Ctrl+Shift+J` - Console
- `Ctrl+Shift+E` - Network

---

**Dúvidas?** Abra uma issue ou procure no [Discussions](../../discussions).

**Enjoy coding!** 🚀
