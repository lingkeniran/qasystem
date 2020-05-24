<!-- 二级回复列表容器组件 -->
<template>
    <div>
        <el-button type="text" @click="dialogVisible = true;getsecondAnswerList(q_id)">
            <div class="actionInner">
                <span>
                    <img src="../../assets/pinglun.png" width="20px">
                </span>
                <span class="text">
                    查看评论
                </span>
            </div> 
        </el-button> 
        <el-dialog
            title="评论"
            :visible.sync="dialogVisible"
            top="30px"
            width="60%"
            append-to-body>
            <div class="second-wrapper">
                <div class="secondAnswerContainer"  v-for="i in SecondReplyList" :key="i.q_id" index='i.q_id'>
                    <div class="secondAnswerItem">
                        <div class="firstAnswerItem-top">
                            <div class="firstAnswerItem-top-userInfo">
                                <img :src="i.u_icon" class="uIcon">
                                <div class="u-name">{{i.u_name}}</div>
                                <div class="text-reply">回复</div>
                                <div v-html="i.replyicon" class="uIcon">{{i.replyicon}}</div>
                                <div class="u-name">{{i.replyname}}</div>
                            </div>
                            <div class="firstAnswerItem-top-likeNumber">
                                {{i.q_like}}个人赞同该回答
                            </div>
                        </div>
                        <div class="firstAnswerItem-content" v-html="i.q_content">
                            {{i.q_content}}
                        </div>
                    </div>
                    <div class="richContentAction">
                        <!-- <el-button type="text" class="little-el-button"  @click="like(i.q_id,i.isLiked)">
                            <div class="actionInner" v-if="i.isLiked===0">
                                <span>
                                    <img src="../../assets/zan.png" width="15px">
                                </span>
                                <div class="little-text">
                                    赞同
                                </div>
                            </div>
                            <div class="actionInner" v-if="i.isLiked===1">
                                <span>
                                    <img src="../../assets/zan1.png" width="15px">
                                </span>
                                <div class="little-text">
                                    取消赞同
                                </div>
                            </div>
                        </el-button> -->
                        <little-like :q_id="i.q_id" :isLike="i.isLiked"></little-like>
                        <reply-answer :q_id="i.q_id"></reply-answer>
                        <littleReport v-if="i.isReported===0&&u_id!=i.u_id" :qId="i.q_id"></littleReport>
                    </div>
                </div>
                <div class="writeSecondAnswer">
                    <el-input type="textarea"
                        autosize
                        placeholder="请写下您的评论..."
                        v-model="secondAnswerContent">
                    </el-input>
                    <el-button class="submitSecondAnswer" type="primary" @click="submitSecondAnswer(q_id)">发布</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Qs from 'qs'
import report from './report.vue'
import littleReport from './littleReport.vue'
import replyAnswer from './replyAnswer.vue'
import littleLike from './littleLike.vue'
export default {
    name:'secondAnswer',
    props:['q_id'],
    components:{
        report,
        littleReport,
        replyAnswer,
        littleLike,
    },
    data(){
        return{
            dialogVisible: false,
            q_id:this.q_id,
            SecondReplyList:[],
            secondAnswerContent:'',
            isClick:'',
            isReply:'',
            replyAnswerDialogVisible:''
        }
    }, 
    created(){
        let q_id=this.q_id
        console.log('q_id',q_id)
        this.getQuesDetail(q_id)
        // this.getsecondAnswerList()
    },
    mounted(){
    },
    updated(){
    },
    methods:{
        getQuesDetail(q_id){
            // let q_id=this.q_id
            // console.log('q_id',q_id)
            let data = {
                page: 1,
                number: 10,
                token: window.sessionStorage.getItem('token'),
                q_id:q_id
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getQuestionDetail',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                // console.log('问题详情',res);
                // console.log('token-uid',_this.u_id)
                // console.log(res.data.resultCode)
                if(res.data.resultCode==20006){
                // if(res.data.list.q_protected==0&&res.data.list.u_reported==0){
                    _this.questionInfo=res.data.data.questionInfo
                    _this.FirstAnswerInfo=res.data.data.FirstAnswerInfo
                    _this.content=res.data.data.questionInfo.q_content 
                    _this.q_finished=res.data.data.questionInfo.q_finished 
                    // console.log(_this.quesList)
                    if(res.data.data.questionInfo.q_finished==1){
                        _this.isEnd=true
                    }else{
                        _this.isEnd=false
                    }
                    if(res.data.data.questionInfo.u_id==_this.u_id){
                        _this.isUser=true
                    }else{
                        _this.isUser=false
                    }
                // }
                }else{
                    // console.log(res.resultCode)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        alert('登录过期,请重新登录')
                    }else if(res.data.resultCode==20007){
                        alert('加载失败，请稍后再试')
                    }
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        getsecondAnswerList(q_id){
            // 获取二级回复列表
            console.log('一级回复id',q_id)
            let _this=this
            let data = {
                q_id: q_id,
                token: window.sessionStorage.getItem('token')
            }
            this.$axios({
                method: "post",
                url: 'user/getReplyDetail',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log('二级回答列表',res);
                if(res.data.resultCode==20006){
                // if(res.data.list.q_protected==0&&res.data.list.u_reported==0){
                    _this.SecondReplyList=res.data.data
                    console.log(_this.SecondReplyList)
                // }
                }else{
                    // console.log(res.resultCode)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        alert('登录过期,请重新登录')
                    }else if(res.data.resultCode==20005){
                        alert('加载失败，请稍后再试')
                    }
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        submitSecondAnswer(q_id){
            // var q_id=this.q_id
            console.log('写评论对应的回答id',q_id)
            let _this=this
            let data = {
                q_content: this.secondAnswerContent,
                q_parent_id: q_id,
                q_total: this.secondAnswerContent,
                token: window.sessionStorage.getItem('token')
            }
            this.$axios({
                method: "post",
                url: 'user/reply',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    // console.log('回答问题',res);
                    // console.log(res.data.resultCode)
                    if(res.data.resultCode==20003){
                        _this.$message({
                            type: 'success',
                            message: '回答成功!'
                        });
                        // location.reload()
                        let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
                        _this.$router.push(NewPage);
                        _this.$router.go(-1);
                    }else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                    }else if(res.data.resultCode==20004){
                        _this.$message({
                            type: 'warning',
                            message: '回答失败!'
                        });
                    }else if(res.data.resultCode==20008||res.data.resultCode==20009){
                        _this.$message({
                            type: 'warning',
                            message: '回答内容中有敏感词!'
                        });
                    }else if(res.data.resultCode==20010||res.data.resultCode==20011){
                        _this.$message({
                            type: 'warning',
                            message: '回答审核失败!'
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
        },
        like(q_id,isClick){
            console.log(q_id,isClick)
            let _this=this
            if(isClick==0){
                isClick=1
                let data = {
                    action: isClick,
                    q_id: q_id,
                    token: window.sessionStorage.getItem('token')
                }
                this.$axios({
                    method: "post",
                    url: 'user/agree',
                    data: Qs.stringify(data)
                })
                .then(function(res) {
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                    }else if(res.data.resultCode==20019){
                        _this.$message({
                            type: 'warning',
                            message: '点赞失败!'
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            }else if(isClick==1){
                isClick=0
                console.log('变化后的isClick',isClick)
                let data = {
                    action: isClick,
                    q_id: q_id,
                    token: window.sessionStorage.getItem('token')
                }
                this.$axios({
                    method: "post",
                    url: 'user/agree',
                    data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log('是否点赞成功',res)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            }
        },
        replySecondAnswer(i,q_id){
            console.log(i)
            console.log(q_id)
            this.isReply=true
            console.log(this.isReply)
            this.replyAnswerDialogVisible=true
        }
    }
}
</script>

<style lang="less" scoped>
.actionInner{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
.el-button{
    margin-top: 10px;
    padding: 5px 10px;
}
.text{
    font-size: 14px;
    color: #229AD1;
    margin-left: 5px;
}
.second-wrapper{
    height: 420px;
    overflow: auto;
}
.writeSecondAnswer{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    bottom: 0px;
    position: absolute;
    border: solid 0.5px #e6e6e6;
    margin: 0;
    left: 0;
    background-color: whitesmoke;
}
.submitSecondAnswer{
    height: 33px;
    margin-left: 5px;
    margin-top: 0;
}
.secondAnswerContainer{
    -webkit-box-flex:1;
    flex: 1 1;
    overflow-x: hidden;
    overflow-y: auto;
    border-bottom: solid 0.5px #e6e6e6;
}
.firstAnswerItem-top-userInfo{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 4px;
}
.u-name{
    font-size: 16px;
    margin-left: 5px;
    color: gray;
}
.text-reply{
    font-size: 16px;
    color: rgb(39, 39, 39);
    margin-left: 10px;
    margin-right: 10px;
}
.firstAnswerItem-top-likeNumber{
    font-size: 10px;
    color: grey;
    margin-top: 2px;
    margin-bottom: 2px;
}
.little-el-button{
    padding: 0;
    margin-top: 3px;
}
.little-text{
    margin-left: 3px;
    font-size: 11px;
    color: #229ad1;
}
.richContentAction{
    margin-bottom: 3px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.isReply{
    display: flex;
    flex-wrap: nowrap;
    margin-right: 20px;
    margin-bottom: 2px;
}
</style>
