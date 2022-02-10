<template>
  <div>
    <my-password-box v-model="value"  :disabled="false" />
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue"
const value=ref<string>('0')
</script>