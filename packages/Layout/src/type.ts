export interface appType{
  device:device,
  isCollapse:boolean,
  show:boolean,
}
export interface themeColor{
  [index: string]: string 
}
export interface propsType{
  themeColor:themeColor,
  list:any[],
  fold?:boolean,//是否开启折叠功能
  foldWith?:number,//当宽度低于多少开启折叠
  defaultActive: string,//默认激活菜单的 index	
  title: string//标题
}
export enum device {
  desktop,
  move
}