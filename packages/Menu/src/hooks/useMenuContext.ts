
import type { ComputedRef, InjectionKey, PropType, Ref, UnwrapRef } from 'vue';
import { defineComponent, inject, provide, toRef } from 'vue';

export interface MenuState{
  isActiveKey:string,
}
export const menuState = Symbol()
const MenuContextKey: InjectionKey<MenuState> = Symbol('menuContextKey');

const useProvideMenu = (props: MenuState) => {
  provide(MenuContextKey, props);
};
const useInjectMenu = () => {
  return inject(MenuContextKey);
}