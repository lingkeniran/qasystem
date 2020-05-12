<template>
    <el-col :span="12">
        <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#2c2c2c"
        active-text-color="#229ad1"
        router>
            <el-submenu index="1">
                <template slot="title">
                    <img src="../../assets/question.png" class="icon">
                    <span>提问</span>
                </template>
                <el-menu-item-group el-menu-item-group>
                    <el-menu-item index="userpage_activeQuestions">活跃问题</el-menu-item>
                    <el-menu-item index="userpage_blockedQuestions">被屏蔽问题</el-menu-item>
                    <el-menu-item index="userpage_terminatedQuestions">已终结问题</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <img src="../../assets/user-answer.png" class="icon">
                    <span>回答</span>
                </template>
                <el-menu-item-group el-menu-item-group>
                    <el-menu-item index="userpage_myAnswers">我的回答</el-menu-item>
                    <el-menu-item index="userpage_blockedAnswers">被屏蔽回答</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
name:'userAsidemenu'
export default {
    
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
    min-height: 450px;
    width: auto;
}
.el-menu-vertical-demo{
    min-height: 450px;
    height: 100%;
    width: 180px;
    font-weight: bold;
}
.el-submenu .el-menu-item{
  min-width: 0;
}
</style>