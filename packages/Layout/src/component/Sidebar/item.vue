<template>
    <template v-for="(item,index) in list" :key="index">
      <el-sub-menu :index="`${item.path}`" v-if="item.children">
          <template #title>
          <el-icon :size="16" v-if="item.meta.icon">
              <component :is="item.meta.icon"  />
          </el-icon>
          <span>
              {{item.meta.title}}
            </span>
          </template>
          <item-tree :list="item.children||[]" />
      </el-sub-menu>
      <el-menu-item v-else :index="`${item.path}`" >
        <el-icon :size="16" >
            <component :is="item.meta.icon" v-if="item.meta.icon" />
        </el-icon>
          <template #title>
            <span  >{{item.meta.title}}</span>
          </template>
      </el-menu-item>
    </template>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  export default defineComponent({
    name:"itemTree",
    props:{
      list:{
        type:Array as PropType<any[]>,
        required:true,
      }
    }
  });
</script>
<style lang="scss" scoped>
.el-icon-document:before {
    content: none;
}
.el-sub-menu{
    .el-menu-item {
        height: 40px;
        line-height: 40px;
    }
}
</style>