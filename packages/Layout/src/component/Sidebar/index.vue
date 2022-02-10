<template>
  <div class="sidebar" >
      <div class="title" :style="{background:props.themeColor.menuBg,color:props.themeColor.menuText}">
        <img src="./logo.png" alt="图标" class="logo">
        <span v-if="!state.isCollapse" style=" margin-left:10px">{{props.title}}</span>
      </div>
      <el-menu
      :default-active="props.defaultActive" 
      class="my-menu" 
      :background-color="props.themeColor.menuBg"
      :text-color="props.themeColor.menuText"
      :unique-opened="false"
      :active-text-color="props.themeColor.menuActiveText"
      @select="select"
      :collapse-transition="false"
      :collapse="state.isCollapse">
      <item-tree :list="props.list" />
    </el-menu>
  </div>
  
</template>
<script lang="ts" setup>
    import ItemTree from './item.vue'
    import {inject} from "vue"
    import {appType,propsType} from "../../type"
    const state:appType=<appType>inject('state')
    const props=<propsType>inject('props')
    const emit = defineEmits(['select'])
    const select=(index:string,param2:string[],)=>{
        emit('select',index,param2)
    }

</script>
<style lang="scss" scoped>
  .my-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .el-menu{
    height:100%;
  }
  .sidebar{
    height:100%;
    >.title{
      height:50px;
      display: flex;
      justify-content:center;
      align-items: center;
      font-size: 17px;
      border-right: 1px solid #fff;
      font-weight: 600;
      >.logo{
        width: 30px;
        height: 30px;
        
      }
    }

    .my-menu{
      
    :deep(.el-menu-item){
        height: 40px;
        line-height: 40px;
        &.is-active {
          background-color: rgba(255, 255, 255, 0.3);
        }
    }
    :deep(.el-sub-menu){
      .el-sub-menu__title{
        height: 40px;
        line-height: 40px;
      }
    }
  }
}


</style>