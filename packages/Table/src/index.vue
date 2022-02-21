<template>
    <div class="my-table">
      <el-table
        ref="multipleTable"
        v-loading="state.loading"
        :stripe="stripe"
        :border="border"
        :data="state.tableData"
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
            :page-size="state.searchParameters.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="state.total"
            v-if="pagination"
          >
      </el-pagination>
    </div>
</template>

<script lang="ts" setup>
import {reactive,onMounted} from "vue"
import {columnsItem,stateType} from "./type"
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
    return [
          {
            prop: "resName",
            label: "项目名称",
          },
          {
            prop: "build",
            label: "建设单位",
          },
          {
            prop: "declare",
            label: "申报单位",
          },
          {
            prop: "time",
            label: "申报时间",
          },
          {
            prop: "resType",
            label: "流程状态",
            slot: "resType",
          },
        ];
  },
  getData() {
      return new Promise((resolve) => {
          const list:any[] = [];
          for (let i = 0; i < 90; i++) {
            const obj = {
              resName: `项目${i}`,
              build: "住建局-城建处",
              declare: "住建局-信息中心",
              time: "2021-08-10",
              resType: i,
            };
            list.push(obj);
          }
          setTimeout(() => resolve({ list, total: list.length }), 1000);
        });
    },
  pagination:true,
  selection:true,
  edit:false,
  stripe:false,
  border:false,
  parameter(){
      return {}
    }
})

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
        state.tableData = res.list;
        state.total = res.total;
        state.loading = false;
      });
    }
const handleSizeChange=(val:number)=> {
      state.searchParameters.pageSize = val;
      state.searchParameters.pageNo = 1;
      getList(props.parameter);
    }
const handleCurrentChange=(val:number)=> {
      state.searchParameters.pageNo = val;
      getList(props.parameter);
    }

onMounted(()=>{
    getList(props.parameter);
})
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