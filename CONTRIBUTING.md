# Contribuindo para DEVMovies

Obrigado por se interessar em contribuir! Este documento fornece diretrizes para participar do projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Começar](#como-começar)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Testes](#testes)
- [Documentação](#documentação)

## 🤝 Código de Conduta

Este projeto adere ao [Contributor Covenant](http://contributor-covenant.org/). Ao participar, você concorda em manter este código de conduta.

**Comportamento Esperado:**
- Usar linguagem inclusiva e respeitosa
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros

**Comportamento Inaceitável:**
- Linguagem ou imagens sexualizadas
- Comentários insultuosos ou depreciativos
- Assédio público ou privado
- Publica informações privadas sem consentimento

Reportar comportamentos inadequados para: [email do projeto]

## 🚀 Como Começar

### 1. Fork e Clone
```bash
# Fork o repositório (via GitHub UI)
# Clone seu fork
git clone https://github.com/SEU_USUARIO/DEVMovies.git
cd DEVMovies

# Adicione o upstream
git remote add upstream https://github.com/prbretas/DEVMovies.git
```

### 2. Configure o Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis no .env
nano .env

# Instale dependências (futuro)
npm install
```

### 3. Crie uma Branch
```bash
# Atualize a main
git fetch upstream
git checkout main
git merge upstream/main

# Crie sua branch
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-fix
# ou
git checkout -b docs/sua-doc
```

### 4. Faça suas Mudanças
```bash
# Edite os arquivos
# Teste suas mudanças localmente
npm test

# Verifique lint
npm run lint

# Formate o código
npm run format
```

## 📝 Processo de Contribuição

### Tipos de Contribuições

#### 🐛 Bug Reports
1. Verifique [Issues](../../issues) - pode já estar reportado
2. Se novo, crie um issue com:
   - Título descritivo
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Environment (browser, OS, etc)

Template:
```markdown
## Descrição do Bug
[Descrição clara e concisa]

## Passos para Reproduzir
1. Ir para...
2. Clicar em...
3. Observar...

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Capturas de tela
[Se aplicável]

## Ambiente
- Browser: [ex. Chrome 90]
- OS: [ex. Windows 10]
- Versão do Node: [ex. 14.0.0]
```

#### ✨ Feature Requests
1. Abra uma Issue com label `enhancement`
2. Descreva:
   - O que você quer
   - Por que é útil
   - Exemplos de uso
   - Possíveis implementações

Template:
```markdown
## Descrição da Feature
[O que você quer adicionar?]

## Justificativa
[Por que isso seria útil?]

## Exemplos
[Como seria usado?]

## Contexto Adicional
[Alguma outra informação?]
```

#### 📚 Documentação
- Melhorias no README
- Adições ao docs/
- Exemplos de código
- Traduções

#### 🔧 Code Contributions
- Bug fixes
- Refactoring
- Novas features
- Otimizações

## 💻 Padrões de Código

### JavaScript/HTML/CSS

#### Naming Conventions
```javascript
// ✅ Bom
const movieList = [];
function fetchMovies() {}
const MAX_RETRIES = 3;
class MovieCard {}

// ❌ Ruim
const ml = [];
function fm() {}
const maxRetries = 3;
class movCard {}
```

#### Indentation
- Use 4 espaços (não tabs)
- Máximo 80 caracteres por linha

#### Comments
```javascript
// ✅ Bom - Explica POR QUÊ, não O QUÊ
// Usando splice para remover items já renderizados
const films = data.splice(0, 20);

// ❌ Ruim - Óbvio
// Remove os primeiros 20 filmes
const films = data.splice(0, 20);
```

#### Error Handling
```javascript
// ✅ Bom
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error('Failed to fetch:', error);
    throw error; // Re-throw para caller lidar
}

// ❌ Ruim
fetch(url).then(r => r.json()).catch(e => console.log(e));
```

#### HTML
```html
<!-- ✅ Bom - Semântico e acessível -->
<article class="film-card" aria-label="Film: Inception">
    <img src="..." alt="Inception poster" class="film-card__img">
    <h3 class="film-card__title">Inception</h3>
    <p class="film-card__description">...</p>
    <button aria-label="Add Inception to favorites">❤️</button>
</article>

<!-- ❌ Ruim - Divs genéricos -->
<div class="fc">
    <img src="...">
    <div>Inception</div>
    <div>...</div>
</div>
```

#### CSS
```css
/* ✅ Bom - BEM convention */
.film-card {
    padding: 1rem;
}

.film-card__title {
    font-size: 1.25rem;
}

.film-card__title--highlighted {
    color: gold;
}

/* ❌ Ruim - Muita especificidade */
div.container div.card h3.title {
    font-size: 1.25rem;
}
```

### Estrutura de Pasta
```
src/
├── components/     # Componentes reutilizáveis
├── utils/          # Funções utilitárias
├── styles/         # Estilos globais
└── scripts/        # Lógica de páginas específicas
```

## 📌 Commit Messages

### Format
```
<tipo>(<escopo>): <assunto>

<corpo>

<rodapé>
```

### Tipos
- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Mudanças em documentação
- `style`: Formatação, missing semicolons, etc (sem mudanças de código)
- `refactor`: Refatoração de código sem mudanças de features
- `perf`: Melhorias de performance
- `test`: Adição ou atualização de testes
- `chore`: Atualizações de build, deps, etc

### Exemplos

```bash
# ✅ Bom
git commit -m "feat(movies): add infinite scroll to movies page"
git commit -m "fix(api): handle rate limit errors gracefully"
git commit -m "docs: add API specification documentation"

# ❌ Ruim
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "wtf why isn't this working"
```

### Template
```
<tipo>(<escopo>): <assunto>
^---^  ^------^   ^--------^
|      |          |
|      |          +-> Assunto no imperativo
|      |
|      +-> Escopo
|
+-> Tipo: feat, fix, docs, style, refactor, perf, test, chore

Corpo (opcional):
- Explique PORQUÊ, não O QUÊ
- Limite a 72 caracteres
- Use bullet points

Rodapé (opcional):
Closes #123
Related-to #456
Breaking-change: descrição
```

## 🔄 Pull Requests

### Antes de Criar

1. **Atualize sua branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Verifique se tudo funciona**
   ```bash
   npm run lint    # Linting
   npm run format  # Formatação
   npm test        # Testes
   ```

3. **Faça um self-review**
   - Código segue padrões?
   - Tem comentários úteis?
   - Testes cobrem mudanças?
   - Não tem debug code?

### Criando o PR

1. **Title** - Use o mesmo padrão de commits
   ```
   feat(movies): add infinite scroll
   fix(api): handle 429 rate limit
   ```

2. **Description** - Use template:
   ```markdown
   ## Descrição
   Breve descrição do que foi feito.

   ## Tipo de Mudança
   - [ ] Bug fix
   - [ ] Nova feature
   - [ ] Breaking change
   - [ ] Documentação

   ## Mudanças
   - Item 1
   - Item 2
   - Item 3

   ## Testing
   Como testar?
   1. Ir para...
   2. Clicar em...
   3. Verificar...

   ## Screenshots (se aplicável)
   ![Alt text](url)

   ## Checklist
   - [ ] Meu código segue os padrões do projeto
   - [ ] Revisei meu próprio código
   - [ ] Adicionei comentários úteis
   - [ ] Atualizei a documentação
   - [ ] Testes foram adicionados/atualizados
   - [ ] Testes passam localmente
   - [ ] Sem novos warnings
   ```

3. **Link Issues**
   ```markdown
   Closes #123
   Relates to #456
   ```

### Durante a Review

- Responda todos os comentários
- Faça as mudanças solicitadas
- Peça clarificação se necessário
- Não discuta na internet quando possível - use calls

### Depois de Aprovado

```bash
# Atualize se necessário
git fetch upstream
git rebase upstream/main

# Push para seu fork
git push origin feature/sua-feature

# Clique merge no GitHub
```

## 🧪 Testes

### Executando Testes
```bash
# Todos os testes
npm test

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Arquivo específico
npm test -- movies.test.js
```

### Escrevendo Testes

Estrutura básica:
```javascript
// ✅ Bom
describe('movies page', () => {
    it('should load movies from API', async () => {
        const mockData = [{ title: 'Inception' }];
        fetchMock.mockResolvedValueOnce(mockData);
        
        const result = await fetchMovies();
        
        expect(result).toEqual(mockData);
        expect(fetchMock).toHaveBeenCalledWith(MOVIES_URL);
    });

    it('should handle API errors', async () => {
        fetchMock.mockRejectedValueOnce(new Error('API Error'));
        
        await expect(fetchMovies()).rejects.toThrow('API Error');
    });
});
```

## 📚 Documentação

### Atualizando Docs

1. **README.md** - Overview, setup, features
2. **docs/API.md** - Documentação de APIs
3. **docs/DEVELOPMENT.md** - Guia de dev
4. **docs/ARCHITECTURE.md** - Decisões arquiteturais
5. **Inline comments** - Para código complexo

### Standards

- Markdown bem formatado
- Exemplos de código funcionam
- Sem typos ou grammatical errors
- Atualizar índices se necessário

## 🐛 Debugging

### Ferramentas

```javascript
// DevTools
console.log()     // Básico
console.table()   // Para arrays/objects
console.time()    // Performance
console.trace()   // Stack trace

// Debugger
debugger;         // Breakpoint
```

### Tips

1. Use `console.table()` para arrays
2. Use `Network tab` para API calls
3. Use `Performance tab` para perf
4. Use `Lighthouse` para audit

## 📞 Comunicação

### Canais

- **Issues** - Para bugs e features
- **Discussions** - Para conversas
- **Pull Requests** - Para código
- **Email** - Para questões privadas

### Responseabilidade

- Responda issues em < 48h
- Revise PRs em < 72h
- Seja respeitoso e profissional

## 🎓 Recursos

- [Git Guide](https://git-scm.com/doc)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [CSS Guidelines](https://cssguidelines.co/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

## ✅ Checklist Final

Antes de submeter:

- [ ] Branch está atualizada com `upstream/main`
- [ ] Sem conflicts
- [ ] Código formatado (`npm run format`)
- [ ] Lint passa (`npm run lint`)
- [ ] Testes passam (`npm test`)
- [ ] Teste manualmente
- [ ] Commits estão bem estruturados
- [ ] PR description completa
- [ ] Documentação atualizada
- [ ] Sem API keys ou secrets

---

## Obrigado! 🙏

Suas contribuições são o que fazem DEVMovies melhor. Agradecemos por gastar seu tempo e esforço!

Se tiver dúvidas, abra uma issue ou entre em contato.

**Happy coding!** 🚀
