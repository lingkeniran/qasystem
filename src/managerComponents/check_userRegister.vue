<template>
    <el-container>
        <manager-header></manager-header>
        <div class="asidemenu">
            <manager-asidemenu></manager-asidemenu>
        </div>
    </el-container>
</template>

<script>
import managerHeader from './module/managerHeader.vue'
import managerAsidemenu from './module/managerAsidemenu.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        managerHeader,
        managerAsidemenu
    },
}
</script>

<style lang="less" scoped>
.el-container{
    display: flex;
    flex-wrap: wrap;
    // justify-content:center;
}
</style>