<template>
  <div class="navbar center" :style="{backgroundColor:themeColor.navbarBg,color:themeColor.menuText}">
      <div class="center">
        <el-icon :size="24" :color="themeColor.menuText" v-if="props.fold" style="margin-left: 10px;">
          <Expand v-if="state.isCollapse" @click="changeCollapse(false)" /> 
          <Fold v-else @click="changeCollapse(true)" />
        </el-icon>
      </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Fold,Expand} from "@element-plus/icons-vue"
import {inject} from "vue"
import {appType,propsType} from "../../type"

const themeColor:any =inject('themeColor')
const state:appType =<appType>inject('state')
const props=<propsType>inject('props')
const changeCollapse=<Function>inject('changeCollapse')

</script>
<style lang="scss" scoped>
.center{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar{
  width: 100%;
  background: #fff;
  height: 50px;
  overflow: hidden;
  -webkit-box-shadow: 0 0px 4px rgb(0 21 41 / 8%);
  // box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-sizing: border-box;
  .user{
    width: 110px;
    justify-content:space-around;
    img{
      cursor: pointer;
      right: 0px;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
