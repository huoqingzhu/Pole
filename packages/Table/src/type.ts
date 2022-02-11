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