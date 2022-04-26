<template>
  <div style="height:1000px;background:linear-gradient(180deg,hsla(0,0%,100%,0),#fbfdff);">
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="true">展开</el-radio-button>
    <el-radio-button :label="false">关闭</el-radio-button>
  </el-radio-group>
    <m-menu 
      @select="select" 
      :collapse="isCollapse"
      :default-active="activeIndex"
      
      >
      <m-menu-item index="0" >
        <template #icon>
        <el-icon :size="18" >
          <Bell />
        </el-icon>
        </template>
        <span>Option0</span>
      </m-menu-item>
      <m-menu-item index="1">
        <template #icon>
        <el-icon :size="18" >
          <edit />
        </el-icon>
        </template>
        <span>Option1</span>
      </m-menu-item>
      <m-sub-menu key="sub1" :disabled="true">
        <template #icon>

        <el-icon :size="20" >
            <Avatar />
        </el-icon>
        </template>
        <template #title> One  </template>
        <m-menu-item index="5">Option 5</m-menu-item>
        <m-menu-item index="6">Option 6</m-menu-item>
        <m-menu-item index="7">Option 7</m-menu-item>
        <m-menu-item index="8">Option 8</m-menu-item>
      </m-sub-menu>
      <m-sub-menu key="sub2" >
        <template #icon>
        <el-icon :size="18" >
            <Avatar />
        </el-icon>
        </template>
        <template #title> two  </template>
        <m-menu-item index="15">Option 5</m-menu-item>
        <m-menu-item index="16">Option 6</m-menu-item>
        <m-menu-item index="17">Option 7</m-menu-item>
        <m-menu-item index="18">Option 8</m-menu-item>
        <m-sub-menu index="sub3" >
        <template #icon>
            <el-icon :size="18" >
                <Football />
            </el-icon>
            </template>
            <template #title> three  </template>
            <m-menu-item index="25" :disabled="true">Option 5</m-menu-item>
            <m-menu-item index="26">Option 6</m-menu-item>
            <m-menu-item index="27">Option 7</m-menu-item>
            <m-menu-item index="28">Option 8</m-menu-item>
        </m-sub-menu>
      </m-sub-menu>
    </m-menu>
  </div>
</template>
<script lang="ts" setup>
import {ref,reactive,toRefs} from "vue"
import {Edit,Avatar,Football,ArrowDown,Bell} from "@element-plus/icons-vue"
const list:any[]=[
            {
              path: "/test",
              name:"测试1",
              meta:{title:"测试1",icon:Edit},
            },
            {
              path: "/test2",
              name:"测试2",
              meta:{title:"测试2",icon:Edit},
            },
            {
              path: "/test3",
              name:"测试3",
              meta:{title:"测试3",icon:Edit},
              children: [
                { path: "/test-1", name:"一级子路1", meta:{title:"一级子路1",}},
                { path: "/test-2", name:"一级子路2", meta:{title:"一级子路2",},
                children:[
                  { path: "/test-1-1",name:"二级级子路1", meta:{title:"二级级子路1"}}
                ]}
              ]
              },
            ]
const state=reactive({
  isCollapse:true,
  activeIndex:'27'
})

const select=(key:string,list:string[]) =>{
  console.log(key,list)
  state.activeIndex=key
  console.log(state.activeIndex)
}
const getTitle=()=>{

}
const {isCollapse,activeIndex} =toRefs(state)
</script>