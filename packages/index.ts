/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { LayoutPlugin } from './Layout';
import { PasswordBoxPlugin } from './PasswordBox';
import { TablePlugin } from './Table';
import { TablePagePlugin } from './TablePage';
import { MenuPlugin } from './Menu';

const MYKitPlugin: Plugin = {
  install(app: App) {
    LayoutPlugin.install?.(app);
    PasswordBoxPlugin.install?.(app);
    TablePlugin.install?.(app);
    TablePagePlugin.install?.(app);
    MenuPlugin.install?.(app);
  },
};

export default MYKitPlugin;

export * from './Layout'
export * from './PasswordBox'
export * from './Table'
export * from './TablePage'
export * from './Menu'