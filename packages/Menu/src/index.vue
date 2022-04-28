<template>
    <div class="m-menu" :style="style">
          <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import {computed,reactive,unref} from "vue"
import {MenuState,useProvideMenu,ItemInfo,SubInfo,MenuMode,Key,} from "./key"


 // Props
interface MenuProps{
  defaultActive:string,//默认激活菜单的 index	
  collapse:boolean,//true 是展开  false是折叠收起菜单
}
const props= withDefaults(defineProps<MenuProps>(),{
  collapse: true,
  defaultActive:'',
})


// 基于类型
const emit = defineEmits<{
  (e: 'select', key:Key,keyList:Key[]): void
}>()

// reactive
const state=reactive<MenuState>({
    isActiveKey:props.defaultActive,
    keyList:[],
    eventList:[],
    collapse: computed(()=>{
      console.log(props.collapse)
      return props.collapse
    }) 
})
//computed
const style=computed(()=>{
    return {
      width:props.collapse ? "212px" : "58px"
    }
})
// 方法
const onItemClick=(value:ItemInfo)=>{
    console.log(value)
    state.isActiveKey=value.key
    state.keyList=value.keyPath
    emit('select',value.key,unref(value.keyPath))
}
const onSubClick=(value:SubInfo)=>{
    console.log(value)
}
// provide
useProvideMenu({
  store:state,
  onItemClick,
  onSubClick
})
</script>
<style scoped lang="scss">
.m-menu{
    font-size: 16px;
    font-weight: 500;
    color: #5e6373;
}
</style>