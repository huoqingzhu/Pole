import { App, Plugin } from 'vue';
import Menu from './src/index.vue';
import MenuItem from './src/menuItem.vue'
import SubMenu from './src/subMenu.vue'
export const MenuPlugin: Plugin = {
  install(app: App) {
    app.component('m-menu', Menu);
    app.component('m-menu-item', MenuItem)
    app.component('m-sub-menu',SubMenu)
  },
};

export {
  Menu,
};
