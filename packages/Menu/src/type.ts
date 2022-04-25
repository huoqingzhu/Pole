import { Edit } from "@element-plus/icons-vue"
export interface list{
  roles?: string[],
  path: string,
  name: string,
  meta?: {
    elIcon?: object|undefined,
    disabled?: boolean,
    hide?: boolean,
    title?:string
  },
  children?: list[]
}
export const listTest:list[]=[
  {
    path: "/test",
    name:"测试1",
    meta:{title:"测试1",elIcon:Edit},
  },
  {
    path: "/test2",
    name:"测试2",
    meta:{title:"测试2",elIcon:Edit},
  },
  {
    path: "/test3",
    name:"测试3",
    meta:{title:"测试3",elIcon:Edit},
    children: [
      { path: "/test-1", name:"一级子路1", meta:{title:"一级子路1",}},
      { path: "/test-2", name:"一级子路2", meta:{title:"一级子路2",},
      children:[
        { path: "/test-1-1",name:"二级级子路1", meta:{title:"二级级子路1"}}
      ]}
    ]
    },
  ]