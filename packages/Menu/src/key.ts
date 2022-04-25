
import type {  InjectionKey,ComputedRef} from 'vue';
import { inject, provide, toRefs } from 'vue';
export type Key = number | string;
export type MenuMode = 'horizontal' | 'vertical';
//类型

export interface MenuState{
  isActiveKey: Key,
  keyList: Key[],
  eventList: string[],
  collapse:ComputedRef<boolean>|boolean
}
export interface ItemInfo{
  key:Key,
  eventKey:string
  keyPath: Key[],
  eventKeyPath: string[],
}
export type SubInfo = ItemInfo & {isUp:boolean}
export type onItemClick = (key: ItemInfo) => void;
export type setListKey = (key: SubInfo) => void;
export interface MenuContextProps{
  store: MenuState,
  onItemClick: onItemClick,
  onSubClick:setListKey
}
const MenuContextKey: InjectionKey<MenuContextProps> = Symbol('menuContextKey');

export const useProvideMenu = (props: MenuContextProps) => {
  provide(MenuContextKey, props);
};

export const useInjectMenu = () => {
  return inject(MenuContextKey) as  MenuContextProps
}
//
export const SetKeyList: InjectionKey<setListKey> = Symbol('SetKeyList')
