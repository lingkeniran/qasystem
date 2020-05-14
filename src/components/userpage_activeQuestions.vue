<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <div class="main-container">
            <div class="userInfo">
                <span>
                    <img class="userIcon" :src="portrait" width="40px" height="40px">
                </span>
                <div class="userNickname">{{u_name}}</div>
            </div>
            <el-main class="ques-answer-container">
                <div class="asidemenu">
                    <user-asidemenu></user-asidemenu>
                </div>
                <div class="content-container">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>个人主页</el-breadcrumb-item>
                        <el-breadcrumb-item>提问</el-breadcrumb-item>
                        <el-breadcrumb-item>活跃问题</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="content">
                        <div class="content-question" v-for="item in quesList" :key="item.q_id" @click="getQuestionDetail(item.q_id)">
                            <div class="content-question-title">
                                {{item.q_title}}
                            </div>
                            <div class="richContentBottom">
                                <div class="richContentAction">
                                    <el-button type="text">
                                        <div class="actionInner">
                                            <span>
                                                <img src="../assets/answer.png" width="20px">
                                            </span>
                                            <span class="text">
                                                {{item.replynumber}}条回答
                                            </span>
                                        </div>
                                    </el-button>
                                </div>
                                <div class="latestReplyTime">
                                    更新时间：{{item.latestReplyTime}}
                                </div>
                            </div>
                        </div>
                        <div class="paging">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage3"
                                :hide-on-single-page=true
                                :page-size="10"
                                layout="prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-main>
            <!-- 返回顶部 -->
            <el-backtop></el-backtop>
        </div>
    </el-container>
</template>

<script>
import myHeader from '../components/module/header.vue'
import userAsidemenu from '../components/module/userAsidemenu.vue'
import Qs from 'qs'
export default {
    components: {
        myHeader,
        userAsidemenu,
    },
    data(){
        return{
            total:'',
            quesList:[],
            portrait:'',
            u_name:'',
        }
    },
    created(){
        this.getQuesList()
        this.getUserInfo()
    },
    methods:{
        getQuesList(){
            let data = {
                page: 1,
                number: 10,
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/activeQuestion',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("活跃问题列表",res);
                _this.quesList=res.data.data.list
                _this.total=res.data.data.totalRow
                if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                    _this.$message({
                        type: 'warning',
                        message: '登录失效，请重新登录!'
                    });
                }else if(res.data.resultCode==20007){
                    _this.$message({
                        type: 'info',
                        message: '您没有活跃的问题，快去提问吧ヾ(๑╹◡╹)ﾉ"'
                    });  
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        handleCurrentChange(e){
            console.log(e)
            // this.listPage.page=e
            let data = {
                page: e,
                number: 10,
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/activeQuestion',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("活跃问题列表",res);
                if(res.data.resultCode==20006){
                    _this.quesList=res.data.data.list
                    _this.total=res.data.data.totalRow
                }else{
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                    }else if(res.data.resultCode==20007){
                        _this.$message({
                            type: 'info',
                            message: '您没有活跃的问题，快去提问吧ヾ(๑╹◡╹)ﾉ"'
                        });  
                    }
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        getUserInfo(){
            let data = {
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getUserInfo',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("个人界面-用户信息",res);
                // console.log(res.data.data.u_icon)
                if(res.data.resultCode==20006){
                    _this.portrait=res.data.data.u_icon
                    _this.u_name=res.data.data.u_name
                }else{
                    console.log(res.resultCode)
                    this.$message.error('登录失效，请重新登录')
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        getQuestionDetail(q_id){
            let _this=this
            _this.$router.push({
                path:'/detail',
                name:'detail',
                //参数
                query:{
                    q_id:q_id,
                    // dataObj:{}
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.el-container{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
.main-container{
    padding-bottom: 20px;
    width: 1060px;
    margin: 0 auto;
}
.userInfo{
    padding-left: 20px;
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
    font-size: 20px;
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
    margin-right: 15px;
}
</style>