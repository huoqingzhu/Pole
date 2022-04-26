<template>
  <div class="sidebar" >
      <!-- <div class="title" :style="{background:props.themeColor.menuBg,color:props.themeColor.menuText}">
        <img src="./logo.png" alt="图标" class="logo">
        <span v-if="!state.isCollapse" style=" margin-left:10px">{{props.title}}</span>
      </div> -->
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
    :deep(.el-menu){
        border-right:solid 10px #fff;
      }
  .sidebar{
    padding: 10px;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        #fbfdff 100%
      );
      z-index: 2;
    >.title{
      height:50px;
      display: flex;
      justify-content:center;
      align-items: center;
      font-size: 17px;
      background: #FFFFFF;
      box-shadow: 0 0px 4px rgb(0 21 41 / 8%);
      font-weight: 600;
      >.logo{
        width: 30px;
        height: 30px;
        
      }
    }

    .my-menu{
    
      
    :deep(.el-menu-item){
        height: 45px;
        line-height: 45px;
        &.is-active {
              background:linear-gradient(98deg, #4290FF 0%, #5DB5FF 72%, #84CEFF 100%);
              box-shadow: 0px 2px 6px 0px rgba(126, 163, 226, 0.6);
              border-radius: 4px;

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