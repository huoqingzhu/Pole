export interface columnsItem{
  prop:string,//key
  label:string,//列名
  sortable?:boolean,//
  width?:string,
  slot?:string,
}
export interface propsType{
  selection?:boolean,//序号
  columns?:columnsItem[],
  getData?:Function,
  parameter?:object,
  pagination?:boolean,
  edit?:boolean
}
export interface  stateType {
  loading:boolean,
  tableData:any[],
  multipleSelection:any[],
  searchParameters:{ pageSize: number,pageNo: number},
  total:number,
}
export const columns =[
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
export const getData=()=> {
  return new Promise((resolve) => {
      const list:any[] = [];
      for (let i = 0; i < 9; i++) {
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
}