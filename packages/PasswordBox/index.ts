import { App, Plugin } from 'vue';
import PasswordBox from './src/index.vue';

export const PasswordBoxPlugin: Plugin = {
  install(app: App) {
    app.component('my-password-box', PasswordBox);
  },
};

export {
  PasswordBox,
};
