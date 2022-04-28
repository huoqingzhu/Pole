<template>
    <el-tooltip
            class="box-item"
            effect="dark"
            placement="right"
            :disabled="collapse"
        >
        <template #content v-if="!collapse">
                <slot  ></slot>
        </template>
        <div :class="className" @click="subClick">
            <span class="icon m-center"> <slot name="icon"></slot> {{}}</span>
            <span v-show="collapse"> <slot  ></slot></span>
        </div>
    </el-tooltip>
</template>
<script lang="ts" setup>
import {ref,computed,getCurrentInstance,inject} from "vue"
import {useInjectMenu,ItemInfo,Key} from "./key"
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
const {store,onItemClick}=useInjectMenu()
// ref
const isUp=ref(true)
// key
const instance = getCurrentInstance();
console.log(instance?.vnode)
const index= IndexGuid()
const key =props.index??index
const eventKey =`menu_item_${index}_$$_${key}`
const { parentEventKeys, parentKeys } = useInjectKeyPath();
    const keysPath = computed(() => {
        return [...parentKeys.value, key];
    });
const getInfo=():ItemInfo=>{
    return {
        key:key,
        eventKey:eventKey,
        keyPath: keysPath as any,
        eventKeyPath: [...parentEventKeys.value, eventKey],
    } 
}
if(store.isActiveKey==key){
        onItemClick(getInfo())
}

// 方法
const subClick=()=>{
    if(props.disabled){
        return
    }
    onItemClick(getInfo())
    isUp.value=!isUp.value;
}
//computed

const collapse=computed(()=>{
    if(parentEventKeys.value.length>0){
        return true
    }else{
        return store.collapse
    }
})
const className=computed(()=>{ 
    const isActive=store.isActiveKey==key
    const keysPathLength=keysPath.value.length
        return [
            'menu-item',
            'm-center',
            collapse.value ? '':'collapse',
            props.disabled ? 'disabled' : '',
            (isActive&&store.collapse)||(keysPathLength==1&&isActive)?"isActive":'',
            isActive&&keysPathLength>1&&!store.collapse?"isActive-collapse":''
        ]
})

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
.collapse{
    justify-content: center;
}


.menu-item{
    width: 100%;
    height: 44px;
    // padding-left: 24px;
    margin-bottom: 8px;

    .icon{
        margin-right: 8px;
        margin-left: 12px;
    }
    &:hover {
    background: #e0efff;
    border-radius: 4px;
    color: #333;
    }
}
    .isActive {
        background: linear-gradient(98deg, #4290ff 0%, #5db5ff 72%, #84ceff 100%);
        box-shadow: 0px 2px 6px 0px rgba(126, 163, 226, 0.6);
        border-radius: 4px;
        color: #fff;
        &:hover {
            background: linear-gradient(98deg, #4290ff 0%, #5db5ff 72%, #84ceff 100%);
            box-shadow: 0px 2px 6px 0px rgba(126, 163, 226, 0.6);
            border-radius: 4px;
            color: #fff;
        }
    }
    .isActive-collapse{
            color: #4290ff;
    }
    .isActive-collapse:hover{
        color: #4290ff;
    }
.disabled:hover {
    color: #bcc1cb;
}
</style>