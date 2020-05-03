<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
    </el-container>
</template>

<script>
import myHeader from '../components/module/header.vue'
export default {
    components: {
        myHeader,
    },
}
</script>

<style lang="less" scoped>
.el-container{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
</style>