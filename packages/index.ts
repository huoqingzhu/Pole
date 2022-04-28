/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { LayoutPlugin } from './Layout';
import { TablePlugin } from './Table';
import { MenuPlugin } from './Menu';

const MYKitPlugin: Plugin = {
  install(app: App) {
    LayoutPlugin.install?.(app);
    TablePlugin.install?.(app);
    MenuPlugin.install?.(app);
  },
};

export default MYKitPlugin;

export * from './Layout'
export * from './Table'
export * from './Menu'