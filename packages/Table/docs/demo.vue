<template>
  <div>
    <my-table :columns="columns" mode="data" :edit="true" :tableData="data">
    </my-table>
    <my-table :columns="columns" mode="request" :getData="getData" :edit="true">
      <template #resType="{row:{resType}}">
          {{processKey[resType]}}
      </template>
      <template #operation="{row}">
          <el-button>编辑</el-button>
      </template>
    </my-table>
  </div>
</template>
<script lang="ts" setup>
import {ref,onMounted} from "vue"
const data=ref([])
const columns=[
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
const getData=(parameter:{pageSize:number,pageNo:number})=>{
  return new Promise((resolve) => {
          console.log(parameter)
          const list:any[] = [];
          for (let i = 1; i < parameter.pageSize; i++) {
            const obj = {
              resName: `项目${i*parameter.pageNo}`,
              build: "住建局-城建处",
              declare: "住建局-信息中心",
              time: "2021-08-10",
              resType: i,
            };
            list.push(obj);
          }
          setTimeout(() => resolve({ list, total: list.length*10 }), 1000);
    });
}
onMounted(() => {
  getData({pageSize:10,pageNo:1}).then(res=>{
      data.value=(res as any).list
      console.log(data.value)
  })
})
const processKey=Object.freeze({
        1: "待修改",
        2: "待材料审核",
        3: "待评审",
        4: "待发起评审会",
        5: "待评分",
        6: "待确认评分",
        7: "待方案备案",
        8: "待传评审结论",
        9: "不予立项",
        10: "待预算备案",
        11: "待采购备案",
        12: "立项采购完成",
})
</script>