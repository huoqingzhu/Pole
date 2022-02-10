<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 布局

后台管理的布局组件

## 基础用法

<Preview comp-name="Layout" demo-name="demo">
  <demo />
</Preview>

## 属性

属性 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`list` | 菜单列表的数据项 | Array | - | [] | 否
`fold` | 是否开启折叠功能 | boolean | - | `true` | 否
`foldWith` | 当宽度低于多少开启折叠 | number | - | `800` | 否
`defaultActive` | 默认激活菜单的 index  | string | - | - | 否
`title` | 标题 | string | - | `这是一个标题` | 否

## 事件

事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`click` | 点击事件 | $event | 原生的 dom event
`customEvent` | 自定义事件 | [a, b, c] | a：参数一；b：参数二；c：参数三
