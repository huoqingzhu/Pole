<template>
    <div class="my-table">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :stripe="stripe"
        :border="border"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" v-if="selection">
        </el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          :width="item.width"
        >
          <template #="{row}">
            <slot :name="item.slot" :row="row" v-if="item.slot">
              {{ row[item.prop] }}
            </slot>
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" v-if="edit">
          <template #="{row}">
            <slot name="operation" :row="row">
              
            </slot>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
            class="my-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="searchParameters.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            v-if="pagination"
          >
      </el-pagination>
    </div>
</template>

<script lang="ts" setup>
import {reactive,onMounted,toRefs, watch} from "vue"
import {columnsItem,stateType,columns,getData} from "./type"
const props= withDefaults(defineProps<{
      selection?:boolean,//是否展示序号
      mode:string,//data||request
      columns?:columnsItem[],//表头配置
      getData?:Function,//通过函数获取数据
      tableData:any[],
      parameter?:object,//请求额外参数
      pagination?:boolean,//是否展示分页
      edit?:boolean//是否展示编辑
      stripe?:boolean//是否为斑马纹 table	
      border?:boolean//是否带有纵向边框
      resKey?:string//通过接口请求获取数据的key
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
  resKey:'list',
  mode:"data",
  parameter(){
      return {}
    }
})
const emit = defineEmits(['change','size-change','current-change'])
const state:stateType=reactive({
    loading:false,
    tableData:[],
    multipleSelection:[],
    searchParameters: {
        pageSize: 10,
        pageNo: 1,
      },
      total:1
})
const handleSelectionChange=(value:any[])=>{
  state.multipleSelection = value;
}
const getList=(parameter = props.parameter)=> {
      state.loading = true;
          let _opt = { ...state.searchParameters, ...parameter };
          props.getData(_opt).then((res:any) => {
            state.tableData = res[props.resKey];
            state.total = res.total;
            state.loading = false;
          });
    }
const handleSizeChange=(val:number)=> {
      if(props.mode=='data'){
        emit('size-change',val)
      }else{
        state.searchParameters.pageSize = val;
        state.searchParameters.pageNo = 1;
        getList(props.parameter);
      }
    }
const handleCurrentChange=(val:number)=> {
    if(props.mode=='data'){
        emit('current-change',val)
      }else{
        state.searchParameters.pageNo = val;
        getList(props.parameter);
      }
    }


onMounted(()=>{
  if(props.mode=='data'){
      state.tableData = props.tableData     
  }else{
    getList(props.parameter)
  }
  watch(()=>props.tableData,(a)=>{
    state.tableData = a 
  })
})
//导出属性到页面中使用
const { loading, tableData,searchParameters,total} = toRefs(state)
</script>

<style scoped lang="scss">
.my-table {
  width: 100%;
}
.my-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>