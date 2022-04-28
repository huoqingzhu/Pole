<template>
    <div :class="className" @click="subClick" @mouseenter="mouseover"   @mouseleave="mouseout">
        <span class="iconFF m-center">
            <slot name="icon"></slot>
        </span>
        <span class="title"  v-show="collapse">
            <slot name="title"></slot>
        </span>
        <span class="edit m-center" v-show="collapse">
            <el-icon :size="14"  color="#333" v-if="!disabled&&store.collapse">
                <ArrowDownBold v-if="isUp" />
                <ArrowUpBold  v-else />
            </el-icon>
            <el-icon :size="14"  color="#333" v-if="!store.collapse">
                <ArrowLeftBold v-if="show" />
                <ArrowRightBold  v-else />
            </el-icon>
        </span>
        <div class="xuanfu" v-show="show&&!store.collapse&&!disabled">
            <div class="count">
                <slot></slot>
            </div>
        </div>
    </div>
    <div v-show="!isUp&&store.collapse&&!disabled" class="collapseCount"><slot></slot></div>

</template>
<script lang="ts" setup>
import {ref,computed,getCurrentInstance,onBeforeUnmount} from "vue"
import {ArrowUpBold,ArrowDownBold,ArrowLeftBold,ArrowRightBold} from "@element-plus/icons-vue"
import {useInjectMenu,SubInfo,Key} from "./key"
import useProvideKeyPath, { useInjectKeyPath ,IndexGuid} from './keyPath';
// Props
interface Props{
    disabled?:boolean,
    isActive?:string
    index:Key
}
const props= withDefaults(defineProps<Props>(),{
    disabled:false,
})

// inject
const {store,onSubClick}=useInjectMenu()
const { parentEventKeys, parentInfo, parentKeys } = useInjectKeyPath();
// ref
const isUp=ref(false)
const show=ref(false)
const childrenEventKeys = ref([]);
const getInfo=():SubInfo=>{
    return {
        key:key,
        eventKey:eventKey,
        keyPath: keysPath as any,
        eventKeyPath: [...parentEventKeys.value, eventKey],
        isUp:isUp.value,
    } 
}
// key
    // const instance = getCurrentInstance();
    const index= IndexGuid()
    const key =props.index??index
    const eventKey =`menu_item_${index}_$$_${key}`
    parentInfo.childrenEventKeys?.value.push(eventKey);
    onBeforeUnmount(() => {
        if (parentInfo.childrenEventKeys) {
            parentInfo.childrenEventKeys.value = parentInfo.childrenEventKeys?.value.filter(
            k => k != eventKey,
            );
        }
    });
// 方法
const subClick=()=>{
    if(props.disabled||!store.collapse){
        return
    }
    onSubClick(getInfo())
    isUp.value=!isUp.value;
}
const mouseover=()=>{
    show.value=true
}
const mouseout=()=>{
    show.value=false
}
const collapse=computed(()=>{
    if(parentEventKeys.value.length>0){
        return true
    }else{
        return store.collapse
    }
})
//computed
const className=computed(()=>{
    console.log()
        return [
            'menu-sub',
            'm-center',
            collapse .value? '':'collapse',
            props.disabled ? 'disabled' : '',
            store.keyList.includes(key as string)?"isActive":''
        ]
})
const keysPath = computed(() => [...parentKeys.value, key]);
const menuInfo = {
        eventKey,
        key,
        parentEventKeys,
        childrenEventKeys,
        parentKeys,
        disabled:computed(()=>{
            return props.disabled
        })
    };
// provide
useProvideKeyPath(eventKey,key as string,menuInfo)
</script>
<style scoped lang="scss" >
.m-center{
    display: flex;
    align-items: center;
}
.disabled {
    cursor: not-allowed;
    color: #bcc1cb;
}
.isActive {
    color: #4290ff;
}
.collapse{
    justify-content: center;
    // background: pink;
}

.menu-sub{
    width: 100%;
    height: 44px;
    // padding-left: 24px;
    position: relative;
    z-index: 1;
    margin-bottom: 8px;
    .edit{
        position: absolute;
        right:10px;
        top: 12px;
        z-index: 99;
    }
    &:hover{
        color: #4290ff;
    }
    .iconFF{
        margin-right: 8px;
        margin-left: 12px;
    }
    .xuanfu{
            position: absolute;
            right:-220px;
            top: -18px;
            z-index: 999;
            padding: 20px 20px;
            width: 184px;
            box-sizing: content-box;
            .count{
            background: #FFFFFF;
            color:#5e6373;
            box-shadow: 0px 3px 5px -2px rgba(7, 88, 202, 0.12), 0px 6px 14px 0px rgba(7, 88, 202, 0.06), 0px 7px 24px 8px rgba(7, 88, 202, 0.05);
            border-radius: 4px;
            }

    }
}
.collapseCount {
    background: #f7faff;
    padding:10px
}
.menu-sub:hover {
    // background: #e0efff;
    // border-radius: 4px;
    // color: #333;
}
.disabled:hover {
    // cursor: not-allowed;
    color: #bcc1cb;
}
</style>