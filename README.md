# QA Playwright CI

Projeto de automação de testes web com Playwright e TypeScript, desenvolvido para demonstrar maturidade em qualidade de software, automação e pipelines de CI/CD.

## Visão geral

Este repositório foi pensado como um portfólio profissional para QA, com foco em:

- automação de cenários críticos de negócio
- arquitetura organizada e reutilizável
- execução em múltiplos navegadores
- relatórios estruturados para evidência de qualidade
- integração contínua com feedback rápido para time e stakeholders

## Objetivo do projeto

Demonstrar capacidade de:

- validar fluxos reais do usuário
- reduzir risco de regressão em releases
- estruturar testes com manutenção simples
- aplicar boas práticas em automação de testes
- entregar evidências claras para tomada de decisão

## Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Allure Report
- HTML Report

## Estratégia de testes

A suíte foi organizada com foco em:

- Smoke tests para validação rápida
- Regression tests para fluxo crítico do usuário
- Testes orientados ao comportamento real de negócio
- Separação entre páginas, dados e cenário de teste

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
│   │   └── cart-flow.spec.ts
│   └── smoke/
│       └── login.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
├── allure-results/
├── playwright-report/
├── test-results/
└── node_modules/
```

## Requisitos

- Node.js 20+
- npm

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Instale os browsers do Playwright:

```bash
npx playwright install
```

3. Execute todos os testes:

```bash
npm test
```

4. Execute smoke tests:

```bash
npm run test:smoke
```

5. Execute fluxo de regressão:

```bash
npx playwright test --grep @regression
```

6. Abra o relatório HTML:

```bash
npm run test:report
```

## Cenários cobertos

- Login com usuário válido
- Login com usuário bloqueado
- Validação de URL após autenticação
- Mensagem de erro para credenciais inválidas
- Adição de produto ao carrinho
- Validação do fluxo de checkout

## Pipeline CI/CD

O projeto está integrado com GitHub Actions e executa etapas de:

- instalação de dependências
- configuração do ambiente
- execução em navegadores diferentes
- coleta de artefatos e relatórios
- evidência de falhas e resultados de execução

## Boas práticas implementadas

- Page Object Model (POM)
- separação de dados e locators
- estrutura por tipo de teste
- configuração centralizada do ambiente
- screenshots e vídeo em falhas
- uso de retries em pipeline CI

## Evidência de qualidade

A suíte atual foi validada com sucesso em execução local. O projeto apresenta comportamento estável e pronto para evolução em cenários mais complexos.

## Observações para portfolio

Este projeto representa uma base sólida para apresentação a empresas, demonstrando:

- visão de qualidade e automação
- disciplina em arquitetura de testes
- integração com pipelines
- cultura de relatórios e evidências

## Contato

- GitHub: https://github.com/brunakaren10
- LinkedIn: adicione seu perfil
- E-mail: adicione seu e-mail

---

Projeto em evolução para demonstrar maturidade em qualidade de software e automação de testes.

