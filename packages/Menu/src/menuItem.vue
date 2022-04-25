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
            <span class="icon center"> <slot name="icon"></slot> {{}}</span>
            <span v-show="collapse"> <slot  ></slot></span>
        </div>
    </el-tooltip>
</template>
<script lang="ts" setup>
import {ref,computed,getCurrentInstance,inject} from "vue"
import {useInjectMenu,ItemInfo} from "./key"
import useProvideKeyPath, { useInjectKeyPath ,IndexGuid} from './keyPath';
// Props
interface Props{
    disabled?:boolean,
    isActive?:string
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
const key =typeof instance?.vnode.key === 'symbol' ? String(instance.vnode.key) : instance?.vnode.key??'';

const eventKey =`menu_item_${IndexGuid()}_$$_${key}`
const { parentEventKeys, parentKeys,parentInfo } = useInjectKeyPath();
// console.log(key,parentEventKeys.value, parentKeys.value )
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
        return [
            'menu-item',
            'center',
            collapse.value ? '':'collapse',
            props.disabled ? 'disabled' : '',
            store.isActiveKey==key?"isActive":''
        ]
})

</script>
<style scoped lang="scss" >
.center{
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
.disabled:hover {
    color: #bcc1cb;
}
</style>