# DEVMovies Testing Guide

## 📋 Visão Geral

Este documento descreve a estratégia e execução de testes para DEVMovies.

## 🧪 Tipos de Testes

### 1. Testes Unitários
**O que:** Testar funções isoladas em contexto  
**Onde:** `tests/unit/*.test.js`  
**Exemplo:**
```javascript
describe('formatMovieRating', () => {
    it('should format rating to 1 decimal place', () => {
        expect(formatMovieRating(9.25)).toBe('9.3');
    });
});
```

### 2. Testes de Integração
**O que:** Testar múltiplos componentes juntos  
**Onde:** `tests/integration/*.test.js`  
**Exemplo:**
```javascript
describe('Movies Module', () => {
    it('should fetch and render movies', async () => {
        // Mock API
        // Render component
        // Assert DOM changed
    });
});
```

### 3. Testes End-to-End (E2E)
**O que:** Testar fluxo completo do usuário  
**Onde:** `tests/e2e/*.test.js`  
**Ferramentas:** Playwright, Cypress (futuro)  
**Exemplo:**
```javascript
describe('User Journey', () => {
    it('should view movie details', async () => {
        await page.goto('http://localhost:8000');
        await page.click('.film-card');
        expect(await page.title()).toContain('Movie Details');
    });
});
```

## 🚀 Executar Testes

### Todos os testes
```bash
npm test
```

### Teste específico
```bash
npm test -- movies.test.js
```

### Watch mode (re-run on change)
```bash
npm test:watch
```

### Com coverage
```bash
npm test:coverage
```

### Coverage report
```bash
npm test:coverage
open coverage/lcov-report/index.html
```

## 📊 Coverage Goals

| Tipo | Alvo | Atual |
|------|------|-------|
| Statements | 80% | 0% |
| Branches | 75% | 0% |
| Functions | 80% | 0% |
| Lines | 80% | 0% |

## ✍️ Escrevendo Testes

### Estrutura Básica (AAA Pattern)

```javascript
describe('Feature Name', () => {
    it('should do something specific', () => {
        // Arrange - Setup
        const input = 5;
        
        // Act - Execute
        const result = multiplyByTwo(input);
        
        // Assert - Verify
        expect(result).toBe(10);
    });
});
```

### Testes com Async

```javascript
describe('API calls', () => {
    it('should fetch data', async () => {
        // Arrange
        const mockData = { title: 'Test' };
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

        // Act
        const result = await fetchMovie(1);

        // Assert
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api'));
    });
});
```

### Testes de DOM

```javascript
describe('Movie Rendering', () => {
    it('should render film cards', () => {
        // Arrange
        const container = document.createElement('div');
        container.id = 'films';
        document.body.appendChild(container);

        // Act
        renderFilms([{ title: 'Inception', rating: 9.3 }]);

        // Assert
        const card = document.querySelector('.film-card');
        expect(card).toBeTruthy();
        expect(card.textContent).toContain('Inception');
    });
});
```

### Mocking

```javascript
// Mock módulo
jest.mock('./api.js');

// Mock função
const mockFetch = jest.fn();

// Mock com valor de retorno
mockFetch.mockResolvedValueOnce({ data: 'test' });

// Mock com erro
mockFetch.mockRejectedValueOnce(new Error('API failed'));

// Verificar chamadas
expect(mockFetch).toHaveBeenCalled();
expect(mockFetch).toHaveBeenCalledWith('url', { method: 'GET' });
expect(mockFetch).toHaveBeenCalledTimes(2);
```

## 🔍 Common Assertions

```javascript
// Igualdade
expect(value).toBe(5);           // Estrita (===)
expect(obj).toEqual({ id: 1 });  // Por valor

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Números
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(5.1);

// Strings
expect(text).toMatch(/regexp/);
expect(text).toContain('substring');

// Arrays
expect(arr).toContain(item);
expect(arr).toHaveLength(3);

// Funções
expect(fn).toThrow();
expect(fn).toThrow('Error message');

// Mocks
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledWith(arg);
```

## 📝 Test Checklist

Antes de submeter código:

- [ ] Testes novos escritos
- [ ] Testes existentes passam
- [ ] Coverage não diminuiu
- [ ] Sem testes commented out
- [ ] Nomes descritivos
- [ ] Sem hardcoded values (usar fixtures)

## 🛠️ CI/CD Integration

Testes rodam automaticamente em:
- ✅ Pull requests
- ✅ Commits em main
- ✅ Schedule semanal
- ❌ Failover rápido (opcional)

Ver status em: `.github/workflows/tests.yml`

## 📚 Recursos

- [Jest Docs](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Jest Cheatsheet](https://devhints.io/jest)
- [Mocking Best Practices](https://stackoverflow.com/questions/36312450)

---

*Próximas melhorias:* E2E tests com Playwright, Coverage reporting, Performance benchmarks
