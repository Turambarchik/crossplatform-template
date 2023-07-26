import {defineConfig} from 'orval';

const config = defineConfig({
  chats: {
    input: {
      target: 'http://3.120.155.45:8083/docs-json',
    },
    output: {
      target: './generated/chats/chats.ts',
      mode: 'split',
      tslint: true,
      prettier: true,
      client: 'axios-functions',
      override: {
        mutator: {
          path: './src/services/api/axiosChatInstance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});

module.exports = config;
