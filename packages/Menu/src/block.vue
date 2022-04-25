<template>
    <div class="block">
        <template v-for="item in list" :key="item.name">
            <div class="block-item" @click="$emit('select')" >{{item.name}}</div>
        </template>
    </div>
</template>
<script lang="ts" >
import {Avatar,ArrowDown,ArrowUp} from "@element-plus/icons-vue"
import { defineComponent,PropType } from "vue"

export default defineComponent({
      name:"Menu",
      components: {ArrowDown,ArrowUp},
      props:{
        fold:{
          type:Boolean,
          default:false
        },
        title:{
          type:String,
          default:"这是你呀"
        },
        isActive:{
          type: String,
          default: '',
        },
        list:Array
      },
      data(){
        return {
          isUp:true,
        }
      },
      methods:{
        mouseover(){

        }
      }

})
</script>
<style scoped lang="scss" >
.block{
  // background: pink;
  box-shadow: 0px 2px 10px 0px rgba(7, 88, 202, 0.1);
  border-radius: 12px; 
  position:absolute;
  right: -200px;
  width: 200px;
  box-shadow: 0px 2px 10px 0px rgba(7, 88, 202, 0.1);
  border-radius: 6px;
  z-index: 2;
  padding:10px 0;
  .block-item{
    color: #D8D8D8;
    height: 44px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding:0 20px;
    + .block-item {
      margin-top: 12px;
  }
  }
  .block-item:hover{
      background: #e0efff;
      border-radius: 4px;
  }
}

</style>