<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 导航菜单

导航菜单

## 基础用法

<Preview comp-name="Menu" demo-name="demo">
  <demo />
</Preview>

## 属性

参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`default-active` | 默认激活菜单的   | string | - | `''` | 否
`collapse` | 第是否水平折叠收起菜单 | boolean | - | `false` | 否

## 事件

事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`select` | 菜单激活回调  | key keyList | 选中index index列表
