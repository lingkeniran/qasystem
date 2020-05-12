<template>
    <el-col :span="12">
        <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#E9E9E9"
        active-text-color="#229ad1"
        background-color="#4E5465"
        router>
            <el-submenu index="1">
                <template slot="title">
                    <img src="../../assets/users.png" class="icon">
                    <span>用户版块</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/manager/check/userRegister">
                        <img src="../../assets/zhuce.png" class="icon">
                        审核用户注册
                    </el-menu-item>
                    <el-menu-item index="/manager/check/userReport">
                        <img src="../../assets/lahei.png" class="icon">
                        审核用户举报
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <img src="../../assets/wenda.png" class="icon">
                    <span>问答版块</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/manager/check/questions">
                        <img src="../../assets/wenti.png" class="icon">
                        审核问题
                    </el-menu-item>
                    <el-menu-item index="/manager/check/answers">
                        <img src="../../assets/huida.png" class="icon">
                        审核回答
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
name:'managerAsidemenu'
export default {
    data(){
        return{}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="less" scoped>
.el-menu{
    width: auto;
}
.icon{
    width: 22px;
    height: 22px;
    margin-right: 5px;
}
.el-col{
    min-height: 555px;
    width: 230px;
}
.el-menu-vertical-demo{
    min-height: 555px;
    height: 100%;
    width: 230px;
    font-weight: bold;
    border: solid 1px #4E5465;
}
.el-submenu .el-menu-item{
    min-width: 0;
}
</style>