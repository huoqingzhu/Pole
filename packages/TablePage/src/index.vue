<template>
  <div class="my-table-page">
      <div class="box-card" style="height: 124px;margin-bottom: 10px;">
        <!-- 搜索的上面空间 -->
        <slot name="header"></slot>
        <div class="seach">
          <div
            style="
              display: flex;
              align-items: center;
              white-space: nowrap;
              width: calc(75% - 7px);
            "
          >
            <!-- 与搜索平行的空间 -->
            <slot name="seach"> </slot>
          </div>
          <div style="display: flex">
            <el-button
              type="primary"
              class="button"
              @click="search"
              >搜索</el-button
            >
            <el-button class="button"  @click="resize"
              >重置</el-button
            >
          </div>
        </div>
      </div>
    <my-table 
      :selection="props.selection"
      :columns="props.columns"
      :getData="props.getData"
      :parameter="props.parameter"
      :pagination="props.pagination"
      :edit="props.edit"
    >
  
    </my-table>
  </div>
</template>

<script lang="ts" setup>
import {columnsItem,stateType,columns,getData} from "./type"
const props= withDefaults(defineProps<{
      selection?:boolean,//是否展示序号
      columns?:columnsItem[],//表头配置
      getData?:Function,//通过函数获取数据
      parameter?:object,//请求额外参数
      pagination?:boolean,//是否展示分页
      edit?:boolean//是否展示编辑
      stripe?:boolean//是否为斑马纹 table	
      border?:boolean//是否带有纵向边框	
}>(),{
  columns(){
    return columns
  },
  getData,
  pagination:true,
  selection:true,
  edit:false,
  stripe:false,
  border:false,
  parameter(){
      return {}
    }
})
const search=()=>{}
const resize=()=>{}

</script>

<style scoped lang="scss">
.my-table-page {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: normal;
  .box-card {
      width: 100%;
      border-radius: 3px;
      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
      padding: 10px;
      color: #747070;
  }
    .seach {
    // margin-top: 20px;
    width: 100%;
    display: flex;
    // flex: 4;
    justify-content: space-between;
  }
}
</style>