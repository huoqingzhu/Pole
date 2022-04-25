<template>
      <div  :class="['strip',isActive==title?'isActive':'']" @click="$emit('select')">
        <div class="center"> 
          <!-- <el-icon :size="18" v-if="icon" >
              <component :is="icon"  />
          </el-icon>   -->
          <span class="flod-title">{{title}}</span>
        </div>
          <el-icon :size="20" @click="isUp=!isUp"  v-if="fold">
              <arrow-down v-if="isUp" />
              <arrow-up v-else />
          </el-icon>
      </div>
      <div v-if="!isUp" class="collapseCount"><slot></slot></div>
</template>
<script lang="ts"  setup>
import {list,} from "./type"
import {reactive,toRefs} from "vue"
const props= withDefaults(defineProps<{
    info:list
}>(),{})
const state =reactive({isUp:false})
const {isUp}= toRefs(state)
</script>
<style scoped lang="scss" src="./fold.scss"></style>