import { App, Plugin } from 'vue';
import TablePage from './src/index.vue';

export const TablePagePlugin: Plugin = {
  install(app: App) {
    app.component('my-table-page', TablePage);
  },
};

export {
  TablePage,
};
