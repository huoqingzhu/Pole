import { App, Plugin } from 'vue';
import Layout from './src/index.vue';

export const LayoutPlugin: Plugin = {
  install(app: App) {
    app.component('my-layout', Layout);
  },
};

export {
  Layout,
};
