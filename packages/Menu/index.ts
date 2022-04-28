import { App, Plugin } from 'vue';
import MMenu from './src/index.vue';
import MMenuItem from './src/menuItem.vue'
import MSubMenu from './src/subMenu.vue'
export const MenuPlugin: Plugin = {
  install(app: App) {
    app.component('m-menu', MMenu);
    app.component('m-menu-item', MMenuItem)
    app.component('m-sub-menu',MSubMenu)
  },
};
export default MMenu
export {
  MMenuItem,
  MSubMenu
};
