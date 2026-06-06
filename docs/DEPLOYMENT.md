# Deployment Guide

## 🚀 DEVMovies Deployment

Este documento descreve como fazer deploy de DEVMovies em diferentes ambientes.

## 📍 Ambientes

### Development
- **URL:** http://localhost:8000
- **Processo:** Local development
- **Database:** Nenhum

### Staging
- **URL:** Staging branch (futuro)
- **Processo:** Pre-production testing
- **Database:** Nenhum (atualmente)

### Production
- **URL:** https://prbretas.github.io/DEVMovies/
- **Processo:** GitHub Pages automatic
- **Database:** Nenhum (atualmente)

## 🔄 Deployment Pipeline

```
Push to main
    ↓
GitHub Actions triggered
    ↓
Run Tests & Lint
    ↓
Build (if needed)
    ↓
Deploy to gh-pages
    ↓
Live! 🎉
```

## 📦 Local Development

```bash
# 1. Setup
git clone https://github.com/prbretas/DEVMovies.git
cd DEVMovies
cp .env.example .env

# 2. Install dependencies (optional)
npm install

# 3. Start server
npm start
# ou
python -m http.server 8000

# 4. Open browser
# http://localhost:8000
```

## 🌐 GitHub Pages Deployment

### Auto-Deploy (Configured)

1. Push para `main` branch
2. GitHub Actions workflow executa
3. Testes rodam
4. Deploy automático em case de sucesso
5. Site atualiza em 2-3 minutos

### Ver Status

```bash
# Check Actions
https://github.com/prbretas/DEVMovies/actions
```

### Configuração

No `.github/workflows/deploy.yml`:
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./
```

## 🔑 Secrets Management

### GitHub Secrets

Configure em: `Settings → Secrets and variables → Actions`

```
VITE_IMDB_API_KEY=...
VITE_DEEZER_API_KEY=...
```

**Nunca** commitar secrets no repositório!

### Local Environment

Crie `.env`:
```env
VITE_IMDB_API_KEY=sua_chave
VITE_DEEZER_API_KEY=sua_chave
```

## ✅ Pre-Deployment Checklist

```bash
# 1. Testes
npm test

# 2. Lint
npm run lint

# 3. Check for secrets
git diff HEAD~1 | grep -i "key\|secret\|password"

# 4. Build check
npm run build

# 5. Commit & Push
git add .
git commit -m "feat: description"
git push origin main
```

## 🐛 Troubleshooting Deployment

### Issue: Actions falhando

**Solução:**
1. Checar logs em Actions
2. Verificar sintaxe do YAML
3. Verificar secrets configurados
4. Re-run com debug

### Issue: Site não atualiza

**Solução:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Aguarde 5 minutos
3. Checar branch correto
4. Verificar GitHub Pages settings

### Issue: Assets faltando

**Solução:**
1. Verificar caminhos relativos
2. Executar localmente
3. Checar console do browser
4. Verificar Network tab

## 📊 Performance Monitoring

### Lighthouse CI

Em progress no workflow:
```yaml
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
```

### Metrics a Monitorar

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

## 📈 Deployment History

Ver histórico em:
```
https://github.com/prbretas/DEVMovies/deployments
```

## 🔄 Rollback

Se deployment quebrar:

```bash
# 1. Revert commit
git revert HEAD

# 2. Push
git push origin main

# 3. Actions roda novamente
# 4. Site volta ao anterior
```

## 🚀 Future Deployment Strategies

### Docker (Futuro)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 8000
CMD ["npm", "start"]
```

Deploy: Docker Hub, Container Registry

### CDN (Futuro)
- Cloudflare
- AWS CloudFront
- Netlify

### Monitoring (Futuro)
- Uptime monitoring
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Logs (LogRocket)

## 📞 Support

- 📋 Issues: https://github.com/prbretas/DEVMovies/issues
- 💬 Discussions: https://github.com/prbretas/DEVMovies/discussions

---

**Última atualização:** Junho 2026
