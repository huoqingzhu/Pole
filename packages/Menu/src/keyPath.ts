
import type {  InjectionKey,ComputedRef,Ref} from 'vue';
import { inject, provide, toRefs, computed } from 'vue';
let indexGuid = 1
export const IndexGuid=()=>{
  return ++indexGuid
}
type Key=number|string;
export interface StoreMenuInfo {
  eventKey: string;
  key: Key;
  parentEventKeys: ComputedRef<string[]>;
  childrenEventKeys?: Ref<string[]>;
  isLeaf?: boolean;
  parentKeys: ComputedRef<Key[]>;
  disabled:ComputedRef<boolean>|boolean
}
const KeyPathContext: InjectionKey<{
  parentEventKeys: ComputedRef<string[]>;
  parentKeys: ComputedRef<string[]>;
  parentInfo: StoreMenuInfo;
}> = Symbol('KeyPathContext');

const useInjectKeyPath = () => {
  return inject(KeyPathContext, {
    parentEventKeys: computed(() => []),
    parentKeys: computed(() => []),
    parentInfo: {} as StoreMenuInfo,
  });
};

const useProvideKeyPath = (eventKey: string, key: Key, menuInfo: StoreMenuInfo) => {
  const { parentEventKeys, parentKeys } = useInjectKeyPath();
  const eventKeys = computed(() => [...parentEventKeys.value, eventKey]);
  const keys = computed(() => [...parentKeys.value, key]);
  provide(KeyPathContext, { parentEventKeys: eventKeys, parentKeys: keys, parentInfo: menuInfo });
  return keys;
};
export { useProvideKeyPath, useInjectKeyPath, KeyPathContext };

export default useProvideKeyPath;