<template>
  <el-input
    :value="value"
    @input="changeVal"
    :disabled="disabled"
    :type="passwordType"
  >
    <template #suffix>
          <el-icon class="el-input__icon"  @click="showPwd">
            <View />
            </el-icon>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {VideoPlay,View} from "@element-plus/icons-vue"
const props =defineProps<{value:string,disabled:boolean}>()
const emit = defineEmits(['change','update:value'])
const passwordType=ref<string>("")
const changeVal=(e:string)=>{
      console.log(e)
      emit('update:value',e)
}
const showPwd=()=>{
      passwordType.value === "password" ? passwordType.value = "text":passwordType.value = "password";
      console.log(passwordType.value)
}
</script>

<style scoped>
.my-password-box {
  
}
</style>