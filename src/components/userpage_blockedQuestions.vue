<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <div class="main-container">
            <div class="userInfo">
                <img class="userIcon" src="../assets/portrait.jpg" width="40px" height="40px">
                <div class="userNickname">用户昵称</div>
            </div>
            <el-main class="ques-answer-container">
                <div class="asidemenu">
                    <user-asidemenu></user-asidemenu>
                </div>
                <div class="content-container">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>个人主页</el-breadcrumb-item>
                        <el-breadcrumb-item>提问</el-breadcrumb-item>
                        <el-breadcrumb-item>被屏蔽问题</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="content">
                        <div class="content-question">
                            <div class="content-question-title">
                                如何度过大学四年？
                            </div>
                            <div class="richContentBottom">
                                <div class="richContentAction">
                                    <el-button type="text">
                                        <div class="actionInner">
                                            <span>
                                                <img src="../assets/answer.png" width="20px">
                                            </span>
                                            <span class="text">
                                                条回答
                                            </span>
                                        </div>
                                    </el-button>
                                </div>
                                <div class="latestReplyTime">
                                    更新时间：
                                </div>
                            </div>
                        </div>
                        <div class="paging">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage3"
                                :hide-on-single-page=true
                                :page-size="100"
                                layout="prev, pager, next, jumper"
                                :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-main>
        </div>
    </el-container>
</template>

<script>
import myHeader from '../components/module/header.vue'
import userAsidemenu from '../components/module/userAsidemenu.vue'
export default {
    components: {
        myHeader,
        userAsidemenu,
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
}
.userInfo{
    margin-top: 20px;
    width: 100%;
    border: solid 1px #e6e6e6;
    height: 60px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.userIcon{
    margin-left: 10px;
}
.userNickname{
    margin-left: 15px;
    font-weight: bold;
}
.ques-answer-container{
    padding: 0;
    margin-top: 30px;
    border: solid 1px #e6e6e6;
    width: 100%;
    min-height: 450px;
    display: flex;
    flex-wrap: nowrap;
}
.asidemenu{
    min-height: 450px;
    width: 180px;
    height: 100%;
}
.content-container{
    width: 100%;
}
.el-breadcrumb{
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.content-question{
    width: auto;
    border: solid 1px #e6e6e6;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
}
.content-question-title{
    width: 100%;
    margin-left: 15px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.8;
    margin-top: 5px;
    margin-bottom: 5px;
}
.richContentBottom{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-left: 3px;
}
.richContentAction{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    // align-items: baseline;
}
.el-button{
    // margin-top: 10px;
    padding: 5px 10px;
}
.text{
    font-size: 14px;
    color: #229AD1;
    margin-left: 5px;
}
.actionInner{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
.paging{
    margin: 10px auto;
    display: flex;
    justify-content: center;
}
.latestReplyTime{
    margin-top: 5px;
    // line-height: 1.6;
    font-size: 12px;
    color: grey;
    margin-left: 15px;
}
</style>