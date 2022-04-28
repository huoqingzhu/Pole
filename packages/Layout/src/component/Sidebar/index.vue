<template>
  <div class="sidebar" >
      <div class="sidebar-title" v-if="state.device">
        <slot name="logo"></slot>
        <span style="margin-left: 8px;"> {{props.title}}</span>
      </div>
      <m-menu
        :default-active="props.defaultActive" 
        class="my-menu" 
        @select="select"
        :collapse="state.isCollapse">
              <item-tree :list="props.list" />
      </m-menu>
  </div>
  
</template>
<script lang="ts" setup>
    import ItemTree from './item.vue'
    import {inject} from "vue"
    import {appType,propsType} from "../../type"
    import MMenu from "../../../../Menu/index"
    const state:appType=<appType>inject('state')
    const props=<propsType>inject('props')
    type key=string|number
    const emit = defineEmits(['select'])
    const select=(index:key,param2:key[],)=>{
        emit('select',index,param2)
    }

</script>
<style lang="scss" scoped>
  .my-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar{
    padding: 10px;
    color: #000;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        #fbfdff 100%
      );
      z-index: 2;
      .sidebar-title{
        width: 202;
        overflow: hidden;
        font-size: 15px;
        font-weight: 600;
        color: #000;
        display: flex;
        padding-left: 10px;
        margin: 10px 0;
        align-items: center;
        white-space: nowrap;
        text-overflow:ellipsis; 
      }
}


</style>