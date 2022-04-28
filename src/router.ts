/* eslint-disable prettier/prettier */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

 import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

 const routes = [{
    title: '布局',
    name: 'Layout',
    path: '/components/Layout',
    component: () => import('packages/Layout/docs/README.md'),
  },{
    title: '表格',
    name: 'Table',
    path: '/components/Table',
    component: () => import('packages/Table/docs/README.md'),
  },{
    title: '导航菜单',
    name: 'Menu',
    path: '/components/Menu',
    component: () => import('packages/Menu/docs/README.md'),
  }];
 
 const routerConfig = {
   history: createWebHashHistory(),
   routes,
   scrollBehavior(to: any, from: any) {
     if (to.path !== from.path) {
       return { top: 0 };
     }
   },
 };
 
 const router = createRouter(routerConfig as RouterOptions);
 
 export default router;
