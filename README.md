# QA Playwright CI

![Playwright Tests](https://github.com/SEU_USUARIO/qa-playwright-ci/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

Projeto de automação de testes web com **Playwright** e **TypeScript**, desenvolvido para demonstrar maturidade em qualidade de software, automação e pipelines de CI/CD.

## Visão geral

Este repositório foi pensado como um portfólio profissional para QA, com foco em:

- automação de cenários críticos de negócio
- arquitetura organizada e reutilizável (Page Object Model)
- execução em múltiplos navegadores
- relatórios estruturados (HTML e Allure) para evidência de qualidade
- registro automático de bugs quando um teste falha
- integração contínua com feedback rápido para time e stakeholders

## Objetivo do projeto

Demonstrar capacidade de:

- validar fluxos reais do usuário
- reduzir risco de regressão em releases
- estruturar testes com manutenção simples
- aplicar boas práticas em automação de testes
- entregar evidências claras para tomada de decisão (relatórios + bug reports)

## Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Allure Report
- HTML Report
- ESLint

## Estratégia de testes

A suíte foi organizada com foco em:

- Smoke tests para validação rápida (`@smoke`)
- Regression tests para fluxo crítico do usuário (`@regression`)
- Testes orientados ao comportamento real de negócio
- Separação entre páginas (POM), dados e cenário de teste
- Registro automático de bug report em markdown quando um teste falha inesperadamente

## Estrutura do projeto

```text
qa-playwright-ci/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── data/
│   │   └── users.ts
│   └── pages/
│       ├── CartPage.ts
│       ├── InventoryPage.ts
│       └── LoginPage.ts
├── tests/
│   ├── regression/
│   │   ├── cart-flow.spec.ts
│   │   ├── remove-item.spec.ts
│   │   └── logout.spec.ts
│   └── smoke/
│       └── login.spec.ts
├── utils/
│   └── bugLogger.ts
├── eslint.config.js
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## Casos de teste cobertos

| Suíte | Cenário | Tag |
|---|---|---|
| Smoke | Login com credenciais válidas | `@smoke` |
| Smoke | Erro ao logar com credenciais inválidas | `@smoke` |
| Regression | Adicionar produto ao carrinho e finalizar checkout | `@regression` |
| Regression | Remover item do carrinho e validar carrinho vazio | `@regression` |
| Regression | Logout e redirecionamento para tela de login | `@regression` |

## Como executar

Clonar e instalar dependências:

```bash
git clone https://github.com/SEU_USUARIO/qa-playwright-ci.git
cd qa-playwright-ci
npm install
npx playwright install
```

Rodar toda a suíte:

```bash
npm test
```

Rodar por tag:

```bash
npm run test:smoke
npm run test:regression
```

Visualizar relatório HTML:

```bash
npm run report
```

## Scripts do projeto (package.json)

```json
{
  "scripts": {
    "test": "playwright test",
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "report": "playwright show-report",
    "lint": "eslint ."
  }
}
```

## Integração contínua (CI/CD)

Pipeline configurado em `.github/workflows/playwright.yml`: executa a suíte completa a cada `push` e `pull request` na branch `main`, instala os navegadores do Playwright e publica o relatório HTML como artefato do workflow — garantindo feedback rápido e evidência de execução sem depender do ambiente local.

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

## Registro automático de bugs

Quando um teste falha de forma inesperada (fora das asserções planejadas), o `utils/bugLogger.ts` gera automaticamente um relatório em Markdown com:

- título e cenário do teste
- passos reproduzidos
- comportamento esperado vs. observado
- stack trace / erro capturado
- timestamp da execução

Isso simula um fluxo real de QA, em que falhas inesperadas geram evidência pronta para abertura de bug no Jira/GitHub Issues, sem trabalho manual adicional.

## Boas práticas aplicadas

- **Page Object Model (POM)**: páginas isoladas em `src/pages`, testes não conhecem seletores diretamente
- **Separação de dados de teste**: usuários e massa de dados centralizados em `src/data`
- **Tags de execução**: `@smoke` e `@regression` permitem rodar subconjuntos sob demanda
- **Lint configurado**: `eslint.config.js` garante padrão de código consistente
- **CI configurado**: execução automatizada a cada push/PR, sem depender de execução manual

## Autora

**Bruna Carvalho** — QA Engineer em transição para automação de testes.

[LinkedIn](#) • [GitHub](#)

---

### Texto sugerido para post no LinkedIn

> 🧪 Mais um projeto no portfólio! Construí uma suíte de testes automatizados end-to-end usando **Playwright + TypeScript**, com foco em qualidade real de processo:
>
> ✅ Smoke e regression tests organizados por tags
> ✅ Page Object Model para código limpo e manutenível
> ✅ Pipeline de CI com GitHub Actions a cada push/PR
> ✅ Relatórios HTML e Allure para evidência de execução
> ✅ Registro automático de bug report quando um teste falha
>
> Foi uma ótima oportunidade pra praticar arquitetura de testes, debug de ambiente e boas práticas de QA automation de ponta a ponta. Código no GitHub 👇
>
> #QA #Playwright #TestAutomation #TypeScript #SoftwareTesting