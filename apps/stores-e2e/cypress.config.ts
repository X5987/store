import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run stores:serve',
        production: 'npx nx run stores:serve-static',
      },
      ciWebServerCommand: 'npx nx run stores:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    supportFile: 'src/support/e2e.ts',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4200',
  },
});
