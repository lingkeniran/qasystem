<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <div class="main-container">
            <div class="userInfo-container">
                
            </div>
        </div>
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
.main-container{
    width: 1060px;
    margin: 0 auto;
    height: 100%;
}
.userInfo-container{
    margin-top: 20px;
    border: solid 1px #e6e6e6;
}
</style>