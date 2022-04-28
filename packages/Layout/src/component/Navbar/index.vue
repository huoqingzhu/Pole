<template>
  <div class="navbar m-center" >
      <div class="m-left-title m-center" v-if="!state.device">
        <span style="width: 58px;text-align: center;padding: 10px;"> <slot name="logo"></slot></span>
        <span v-if="state.isCollapse" style="min-width: 100px;">{{props.title}}</span>
      </div>
      <div class="m-center">
        <el-icon :size="24"   style="margin-left: 10px;">
          <Expand v-if="!state.isCollapse" @click="changeCollapse(false)" /> 
          <Fold v-else @click="changeCollapse(true)" />
        </el-icon>
      </div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Fold,Expand} from "@element-plus/icons-vue"
import {inject} from "vue"
import {appType,propsType} from "../../type"

const state:appType =<appType>inject('state')
const changeCollapse=<Function>inject('changeCollapse')
const props=<propsType>inject('props')


</script>
<style lang="scss" scoped>
.m-center{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar{
  width: 100%;
  background: #fff;
  height: 50px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px 0px rgba(7, 88, 202, 0.1);
  position: relative;
  z-index: 3;
  // box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  // box-sizing: border-box;
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
    .m-left-title {
    min-width: 68px;
    // margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 900;
    font-size: 22px;
  }
  .slot {
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #5e6373;
  }
}
</style>
