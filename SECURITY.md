# Security Policy

## 🔒 Security Reporting

**NÃO** abra issues públicas para vulnerabilidades de segurança!

### Reporte Seguro

1. **Email Privado:** (adicionar email do projeto)
2. **GitHub Security Advisory:** [Report a vulnerability](https://github.com/prbretas/DEVMovies/security/advisories)
3. **Espera tempo razoável:** 90 dias para correção e disclosure

## 🛡️ Segurança no DEVMovies

### Boas Práticas

- ✅ API keys em `.env` (NUNCA em repositório)
- ✅ Validação de input do usuário
- ✅ CSP headers configurados
- ✅ HTTPS enforcement
- ✅ Auditorias de dependências regulares
- ✅ Code review antes de merge

### Riscos Conhecidos

| Risco | Severidade | Status | Mitigação |
|-------|-----------|--------|-----------|
| API keys expostas | 🔴 Crítica | ❌ Não testado | Usar .env |
| XSS attacks | 🔴 Crítica | ⚠️ Parcial | Sanitize HTML |
| CSRF | 🟡 Alto | ⏳ Planejado | CSRF tokens |
| Rate limiting | 🟡 Alto | ✅ Em progresso | Throttling |

### Checklist de Segurança

- [ ] Sem API keys ou secrets
- [ ] Sem credenciais de usuário logadas
- [ ] Inputs validados
- [ ] HTML escapado/sanitizado
- [ ] HTTPS em produção
- [ ] Dependências auditadas
- [ ] Sem vulnerable packages
- [ ] Security headers configurados

### Dependências

Auditamos dependências regularmente:
```bash
npm audit
npm audit fix  # Se patches disponíveis
```

### CI/CD Security

- ✅ GitHub Secrets para dados sensíveis
- ✅ Artifact signing (futuro)
- ✅ SBOM generation (futuro)
- ✅ Dependency scanning (futuro)

## 🚀 Deployment Security

### Pre-deployment Checklist

- [ ] Testes passam
- [ ] Lint sem erros
- [ ] Sem secrets no código
- [ ] Dependencies atualizadas
- [ ] Security audit clean

### Production Considerations

- HTTPS obrigatório
- Security headers (CSP, X-Frame-Options, etc)
- WAF (Web Application Firewall) - futuro
- DDoS protection - futuro
- Monitoring e alertas - futuro

## 📚 Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security](https://docs.github.com/en/code-security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## 🔄 Resposta a Incidentes

1. **Descoberta** → Report seguro
2. **Confirmação** → Tim valida
3. **Correção** → Patch desenvolvido
4. **Release** → Security update lançado
5. **Disclosure** → Comunicado à comunidade

---

**Última atualização:** Junho 2026
