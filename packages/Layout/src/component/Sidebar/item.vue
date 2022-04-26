<template>
    <template v-for="(item,index) in list" >
      <m-sub-menu :key="item.path" :index="item.path" v-if="item.children">
          <template #icon>
          <el-icon :size="16" v-if="item.meta.icon">
              <component :is="item.meta.icon"  />
          </el-icon>
          </template>
          <template #title> <span>
              {{item.meta.title}}
            </span></template>
          <item-tree :list="item.children||[]" />
      </m-sub-menu>
      <m-menu-item v-else :keys="item.path" :index="item.path">
        <template #icon>
            <el-icon :size="16" >
            <component :is="item.meta.icon" v-if="item.meta.icon" />
        </el-icon>
          </template>
          <span  >{{item.meta.title}}</span>
      </m-menu-item>
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
        height: 45px;
        line-height: 45px;
    }
}
</style>