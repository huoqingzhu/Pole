
<template>
  <div class="my-layout" ref="layout">
    <div
      v-if="state.device && state.show"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
      <Navbar navbarBg="#3f8cff" :Fold="Fold"   >
        <template #logo>
            <img src="./logo.png" alt="">
        </template>
        <template #title>
            {{title}}
        </template>
        <slot name="user"></slot>
    </Navbar>
    <div :class="className">
  
      <transition name="slide-fade" v-if="state.device" >
      <Sidebar 
        v-show="state.show"
        @select="select"
        :class="[state.device?'sidebar-container':'']"  />
    </transition>
    <Sidebar 
      v-else
      @select="select"
      :class="[state.device?'sidebar-container':'']"  />
      <div class="content" >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Sidebar from "./component/Sidebar/index.vue"
import {appType,device,themeColor} from "./type"
import Navbar from "./component/Navbar/index.vue"
import {Fold} from "@element-plus/icons-vue"
import { reactive,provide, onMounted,onUnmounted,computed,ref} from "vue"
const props= withDefaults(defineProps<{
  themeColor:themeColor,
  list:any[],
  fold?:boolean,//是否开启折叠功能
  foldWith?:number,//当宽度低于多少开启折叠
  defaultActive: string,//默认激活菜单的 index	
  title:string//标题
}>(),{
  themeColor(){
    return {
      menuText: "#BCC1CB",
      menuActiveText:"#fff",
      subMenuActiveText: '#f4f4f5',
      menuBg:'#fff',
      menuHover: '#263445',
      subMenuBg: '#1f2d3d',
      subMenuHover: '#001528',
      sideBarWidth: '210px',
      navbarBg:'#fff',
      navbarText:'#BCC1CB'
    }
  },
  fold:true,
  foldWith:200,
  title:"这是一个标题",
  list(){
    return []
  }
})

const state:appType = reactive({
  device:device.desktop,//是否为手机
  isCollapse: true,//false是否关闭  ，false 为展开的意思
  show:true,//侧边栏是否隐藏
})
const layout=ref<HTMLElement>()
const emit = defineEmits(['select'])
const select=(index:string,param2:string[],)=>{
  emit('select',index,param2)
}
const className=computed(()=>{
    // return state.device===device.move?['moveMain']:state.isCollapse?['sideMain']:['main']
    return ['main']
})
const fold=props.fold
const detection=()=>{
      const offsetWidth=layout!.value!.offsetWidth
      if( offsetWidth< props.foldWith){
        state.device=device.move
        state.show=false
        state.isCollapse=false;
      }else{
        state.device = device.desktop
        state.show=true
      }
}
onUnmounted(() => {
    if(fold){
      window.removeEventListener("resize", detection);
    }
  })
onMounted(() => {
    if(fold){
      detection();
      window.addEventListener("resize", detection);
    }
  })
const handleClickOutside=()=>{
        state.show=false;
    }
const changeCollapse=()=>{
      if(state.device){
        state.show=!state.show;
      }else{
        state.isCollapse=!state.isCollapse;
      }
  }
  provide('themeColor',props.themeColor)
  provide('state',state)
  provide('list',props.list)
  provide('fold',props.fold)
  provide('defaultActive',props.defaultActive)
  provide('changeCollapse',changeCollapse)
  provide('props',props)
</script>
<style lang="scss" scoped>
.my-layout{
  width: 100%;
  height: 100%;
  // display: flex;
  overflow: hidden;
  overflow-x: auto;
  position: relative;

.main{
  width: 100%;
  display: flex;
  // transition:width 1s;
}
.sideMain{
  width: 100%;
}
.moveMain{
  width: 100%;
}
.content{
  padding: 40px;
  flex: 1;
  // box-sizing: border-box;
  background: #f7faff;
}
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-250px);
  // opacity: 0;
}
.sidebar-container {
  width: 250px;
  height: 100%;
  position: absolute;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
