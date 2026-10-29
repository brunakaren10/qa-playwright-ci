// utils/bugLogger.ts
import fs from 'fs';
import path from 'path';
import type { Page, TestInfo } from '@playwright/test';

interface BugReportInput {
  titulo: string;
  testInfo: TestInfo;
  error: unknown;
  page?: Page;
}

export async function logBug({ titulo, testInfo, error, page }: BugReportInput) {
  const dir = path.join(process.cwd(), 'reports', 'bugs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `bug-${timestamp}.md`;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : 'N/A';

  const content = `# 🐞 Bug Report

**Título:** ${titulo}
**Teste:** ${testInfo.title}
**Arquivo:** ${testInfo.file}
**Data:** ${new Date().toLocaleString('pt-BR')}
**Browser:** ${testInfo.project.name}
**Status:** ${testInfo.status}

## Erro capturado
\`\`\`
${errorMessage}
\`\`\`

## Stack trace
\`\`\`
${errorStack}
\`\`\`

## Passos para reprodução
1. Rodar: \`npx playwright test "${testInfo.title}" --project=${testInfo.project.name}\`
2. Verificar comportamento no navegador

## Ambiente
- Playwright: ver package.json
- CI: ${process.env.CI ? 'Sim (GitHub Actions)' : 'Execução local'}
- Base URL: ${process.env.BASE_URL || 'https://www.saucedemo.com/'}
`;

  fs.writeFileSync(path.join(dir, fileName), content);

  if (page) {
    try {
      const screenshotBuffer = await page.screenshot();
      fs.writeFileSync(path.join(dir, `bug-${timestamp}.png`), screenshotBuffer);
    } catch {
      // Se a página já estiver fechada, ignora screenshot
    }
  }
}
