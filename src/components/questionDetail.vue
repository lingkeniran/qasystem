<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <el-main>
            <div class="ques-container">
                <div class="questionItem">
                    <div class="questionItem-answerItem">
                        <div class="richContentTop" >
                            <div class="isQuesEnd" v-if="questionInfo.q_finished===1">
                                <div class="actionInner">
                                    <span>
                                        <img src="../assets/jinzhi.png" width="20px">
                                    </span>
                                    <span class="text">
                                        问题已终结
                                    </span>
                                </div>
                            </div>
                            <div class="richContentTitle">
                                <a></a>{{questionInfo.q_title}}
                            </div>
                            <!-- <div class="qTime">
                                提问时间：{{item.q_time}}
                            </div> -->
                        </div>
                        <div class="richContent">
                            <!-- <div class="richContentImage">
                                <img src="item.q_picture" width="200px">
                            </div> --> 
                            <div class="richContentInner" v-if="flag===true" @change="configModify;cancelModify">
                                <div v-html="questionInfo.u_icon" class="uIcon">{{questionInfo.u_icon}}</div>
                                <div>{{questionInfo.u_name}}：</div>
                                <div  v-html="questionInfo.q_content">{{questionInfo.q_content}}</div>
                            </div> 
                            <div v-else @change="modifyQues">
                                <div class="quill-container">
                                    <quill-editor class="quill-editor" ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                                </div>
                                <div class="quill-btn-container">
                                    <el-button class="editor-btn" type="primary" @click="configModify()" plain>确认修改</el-button>
                                    <el-button class="editor-btn" type="primary" @click="cancelModify()" plain>取消修改</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="richContentBottom">
                            <div class="richContentAction">
                                <el-button type="text" class="answerQues" @click="answerQuestion();">
                                    <div class="actionInner">
                                        <span>
                                            <img src="../assets/xie.png" width="20px">
                                        </span>
                                        <div class="text">
                                            写回答
                                        </div>
                                    </div>
                                </el-button>
                                <el-button type="text">
                                    <div class="actionInner">
                                        <span>
                                            <img src="../assets/answerGrey.png" width="20px">
                                        </span>
                                        <span class="textGrey">
                                            {{questionInfo.replynumber}}条回答
                                        </span>
                                    </div>
                                </el-button>
                                <el-button type="text" @click="centerDialogVisible = true" v-if="questionInfo.isReported===0&&u_id!=questionInfo.u_id">
                                    <div class="actionInner">
                                        <span>
                                            <img src="../assets/jubao2.png" width="20px">
                                        </span>
                                        <div class="textGrey">
                                            举报
                                        </div>
                                    </div>
                                </el-button>
                                <el-dialog
                                    title="举报"
                                    :visible.sync="centerDialogVisible"
                                    width="50%"
                                    center
                                    @close='closeDialog'
                                    :close-on-click-modal='false'>
                                    <el-input
                                        type="textarea"
                                        :rows="6"
                                        placeholder="请输入举报理由"
                                        v-model="textarea">
                                    </el-input>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="centerDialogVisible = false;report(questionInfo.q_id)">确 定</el-button>
                                    </span>
                                </el-dialog>
                                <el-dropdown class="ellipsis-dropdown" v-if="isUser">
                                    <span class="ellipsis">
                                        <img src="../assets/shenglvehao.png" width="20px">
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <div @click="modify()">编辑问题</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="deleteQues()">删除问题</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="terminal()">终结问题</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="latestReplyTime">
                                更新时间：{{questionInfo.q_time}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="answerQuestionWrapper">
                    <div v-if="answer_flag===true" @change="answerQues()"></div>
                    <div v-else @change="answerQues()">
                        <div class="answer-quill-container">
                            <quill-editor class="answer-quill-editor" ref="myTextEditor" v-model="answercontent" :options="answereditorOption"></quill-editor>
                        </div>
                        <div class="quill-btn-container">
                            <el-button class="editor-btn" type="primary" @click="configAnswer()" plain>提交回答</el-button>
                            <el-button class="editor-btn" type="primary" @click="cancelAnswer()" plain>取消</el-button>
                        </div>
                    </div>
                </div>
                <div class="answerlistWrapper">
                    <div class="firstAnswerContainer">
                        <div class="firstAnswerItem" v-for="item in FirstAnswerInfo.list" :key="item.q_id" index='item.q_id'>
                            <div class="firstAnswerItem-top">
                                <div class="firstAnswerItem-top-userInfo">
                                    <div v-html="item.u_icon" class="uIcon">{{item.u_icon}}</div>
                                    <div class="u-name">{{item.u_name}}</div>
                                </div>
                                <div class="firstAnswerItem-top-likeNumber">
                                    {{item.q_like}}个人赞同该回答
                                </div>
                            </div>
                            <div class="firstAnswerItem-content" v-html="item.q_content">
                                {{item.q_content}}
                            </div>
                            <div class="firstAnswerItem-bottom">
                                <div class="richContentAction">
                                    <el-button type="text">
                                        <div class="actionInner">
                                            <span>
                                                <img src="../assets/zan.png" width="20px">
                                            </span>
                                            <div class="text">
                                                赞同
                                            </div>
                                        </div>
                                    </el-button>
                                    <!-- <el-button type="text" @click="dialogVisible = true;getsecondAnswerList(item.q_id)">
                                        <div class="actionInner">
                                            <span>
                                                <img src="../assets/pinglun.png" width="20px">
                                            </span>
                                            <span class="text">
                                                {{item.replynumber}}条评论
                                            </span>
                                        </div>
                                    </el-button> -->
                                    <second-answer :q_id=item.q_id ></second-answer>
                                    <!-- <el-dialog
                                        :title='item.replynumber+"条评论"'
                                        :visible.sync="dialogVisible"
                                        top="30px"
                                        width="60%"
                                        :open="openSecondAnswerWrapper(item.q_id)"
                                        :close-on-click-modal='false'>
                                        <div class="second-wrapper">
                                            <div class="secondAnswerContainer">
                                                <div class="secondAnswerItem" v-for="i in SecondReplyList.list" :key="i.q_id" index='i.q_id'>
                                                    <div class="firstAnswerItem-top">
                                                        <div class="firstAnswerItem-top-userInfo">
                                                            <div v-html="i.u_icon" class="uIcon">{{i.u_icon}}</div>
                                                            <div class="u-name">{{i.u_name}}</div>
                                                        </div>
                                                        <div class="firstAnswerItem-top-likeNumber">
                                                            {{i.q_like}}个人赞同该回答
                                                        </div>
                                                    </div>
                                                    <div class="firstAnswerItem-content" v-html="i.q_content">
                                                        {{i.q_content}}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="writeSecondAnswer">
                                                <el-input type="textarea"
                                                    autosize
                                                    placeholder="请写下您的评论..."
                                                    v-model="secondAnswerContent">
                                                </el-input>
                                                <el-button class="submitSecondAnswer" type="primary" @click="submitSecondAnswer()">发布</el-button>
                                            </div>
                                        </div>
                                    </el-dialog> -->
                                    <report v-if="item.isReported===0&&u_id!=item.u_id" :qId="item.q_id"></report>
                                </div>
                                <div class="firstAnswerItem-latestReplyTime">
                                    更新时间：{{item.q_time}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import myHeader from '../components/module/header.vue'
import shrinkView from '../components/module/shrinkView.vue'
import report from '../components/module/report.vue'
import secondAnswer from '../components/module/secondAnswer.vue'
import Qs from 'qs'
// import Vue from 'vue'
// import { Message } from 'element-ui'
// Vue.use(Message)
// Vue.prototype.$message = Message
export default {
    inject: ['reload'], //注入
    components: {
        myHeader,
        quillEditor,
        shrinkView,
        report,
        secondAnswer
    },
    data(){
        return{
            questionInfo:[],
            FirstAnswerInfo:[], //一级回答列表
            textarea:'',
            centerDialogVisible: false,
            dialogVisible: false,
            u_id:window.sessionStorage.getItem('u_id'),
            isReport:'',
            flag:true,
            content:'', //修改问题的问题描述内容
            q_id:'',
            isUser:'',
            editorOption:{}, //修改问题的富文本框
            answer_flag:true, //写回答div折叠与否的标志
            q_finished:'', //问题是否已经终结
            answercontent:'', //回答的内容
            answereditorOption:{
                placeholder:'请写下您的回答...'
            },
            open: false, //收缩的flag,
            SecondReplyList:[], //二级回复列表
            secondAnswerContent:'', //二级回复的内容
        }
    },
    created(){
        
    },
    mounted(){
        let q_id=this.$route.query.q_id
        this.q_id=this.$route.query.q_id
        console.log('q_id',q_id)
        this.getQuesDetail(q_id)
    },
    methods:{
        getQuesDetail(q_id){
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
                console.log('问题详情',res);
                console.log('token-uid',_this.u_id)
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
        closeDialog(){
            this.textarea="";
            location.reload()
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        modify(){
            this.flag=false
            console.log(this.flag)
        },
        modifyQues(){
            this.flag=true
        },
        configModify(){
            let data = {
                q_content: this.content,
                token: window.sessionStorage.getItem('token'),
                q_id:this.q_id
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/rewriteQuestion',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log('修改问题',res);
                // console.log(res.data.resultCode)
                if(res.data.resultCode==20017){
                    // this.flag=true
                    // console.log(this.flag)
                    location.reload()
                }else{
                    // console.log(res.resultCode)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        alert('登录过期,请重新登录')
                    }
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        cancelModify(){
            this.flag=true
            console.log(this.flag)
        },
        deleteQues(){
            let data = {
                token: window.sessionStorage.getItem('token'),
                q_id:this.q_id
            }
            let _this=this
            this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: "post",
                        url: 'user/cancelQuestion',
                        data: Qs.stringify(data)
                    })
                    .then(function(res) {
                        console.log('删除问题',res);
                        // console.log(res.data.resultCode)
                        if(res.data.resultCode==20016){
                            // this.flag=true
                            // console.log(this.flag)
                            _this.$router.go(-1)
                        }else{
                            // console.log(res.resultCode)
                            if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                                alert('登录过期,请重新登录')
                            }
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        terminal(){
            let data = {
                token: window.sessionStorage.getItem('token'),
                q_id:this.q_id
            }
            let _this=this
            this.$confirm('此操作将永久终结该问题, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: "post",
                        url: 'user/endQuestion',
                        data: Qs.stringify(data)
                    })
                    .then(function(res) {
                        console.log('终结问题',res);
                        // console.log(res.data.resultCode)
                        if(res.data.resultCode==20015){
                            // 刷新页面
                            location.reload();
                        }else{
                            // console.log(res.resultCode)
                            if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                                alert('登录过期,请重新登录')
                            }
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                    // this.reload()
                    this.$message({
                        type: 'success',
                        message: '终结成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消终结'
                    });          
            });
        },
        report(q_id){
            let _this=this
            console.log('举报问题id',q_id)
            console.log('举报内容',_this.textarea)
            console.log('举报token',window.sessionStorage.getItem('token'))
            let data = {
                q_id: q_id,
                qr_content: _this.textarea,
                token: window.sessionStorage.getItem('token')
            }
            var token=window.sessionStorage.getItem('token')
            if(token==null||token==undefined||token==""){
                alert('请先登录')
            }
            if(_this.textarea==""){
                alert('举报内容不能为空！')
            }
            if(token!=null||token!=undefined||token!="")
            {
                this.$axios({
                method: "post",
                url: 'user/report',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log(res);
                    console.log(res.data.resultCode)
                    if(res.data.resultCode==20013){
                        alert('举报成功!')
                    }
                    else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        alert('登录失效，请重新登录')
                    }else if(res.data.resultCode==20014){
                        alert('举报失败，请稍后再试')
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            }
        },
        answerQuestion(){
            var token=window.sessionStorage.getItem('token')
            if(token==null||token==undefined||token==""){
                alert('请先登录')
            }
            if(this.q_finished==1){
                alert('该问题已终结，无法回答')
            }else{
                this.answer_flag=!this.answer_flag
            }
        },
        answerQues(){
            this.answer_flag=!this.answer_flag
        },
        configAnswer(){
            let _this=this
            let data = {
                q_total: _this.answercontent,
                q_content: _this.answercontent.replace(/<[^>]+>/g, ""),
                q_parent_id: _this.q_id,
                token: window.sessionStorage.getItem('token')
            }
            var token=window.sessionStorage.getItem('token')
            if(_this.answercontent==""){
                alert('回答内容不能为空！')
            }else{
                this.$axios({
                method: "post",
                url: 'user/reply',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log('回答问题',res);
                    console.log(res.data.resultCode)
                    if(res.data.resultCode==20003){
                        _this.$message({
                            type: 'success',
                            message: '回答成功!'
                        });
                        location.reload()
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
            }
        },
        cancelAnswer(){
            this.answer_flag=true
        },
        // getsecondAnswerList(q_id){
        //     // 获取二级回复列表
        //     console.log('一级回复id',q_id)
        //     let _this=this
        //     let data = {
        //         page: 1,
        //         number: 10,
        //         q_id: q_id,
        //         token: window.sessionStorage.getItem('token')
        //     }
        //     this.$axios({
        //         method: "post",
        //         url: 'user/getReplyDetail',
        //         data: Qs.stringify(data)
        //     })
        //     .then(function(res) {
        //         console.log('回答详情',res);
        //         // console.log(res.data.resultCode)
        //         if(res.data.resultCode==20006){
        //         // if(res.data.list.q_protected==0&&res.data.list.u_reported==0){
        //             _this.SecondReplyList=res.data.data.SecondReplyList
        //             // console.log(_this.quesList)
        //         // }
        //         }else{
        //             // console.log(res.resultCode)
        //             if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
        //                 alert('登录过期,请重新登录')
        //             }else if(res.data.resultCode==20005){
        //                 alert('加载失败，请稍后再试')
        //             }
        //         }
        //     })
        //     .catch(function(err) {
        //         console.log(err);
        //     })
        // },
        // submitSecondAnswer(q_id){
        //     console.log('写评论对应的回答id',q_id)
        // },
        openSecondAnswerWrapper(q_id){
            console.log(q_id)
        }
    }
}
</script>

<style lang="less" scoped>
.el-container{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
.ques-container{
    width: 1060px;
    margin: 0 auto;
}
.isQuesEnd{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
}
.richContent{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
}
.richContentTitle{
    width: 100%;
    margin-left: 15px;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.8;
}
.richContentInner{
    padding-left: 15px;
    display: flex;
    flex-wrap: nowrap;
    font-size: 16px;
    line-height: 1.6;
}
.uIcon{
    margin-right: 10px;
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
    margin-top: 10px;
    padding: 5px 10px;
}
.text{
    font-size: 14px;
    color: #229AD1;
    margin-left: 5px;
}
.textGrey{
    font-size: 14px;
    color: #707070;
    margin-left: 5px;
}
.actionInner{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
.questionList{
    width: 750px;
    margin-right: 10px;
}
.questionItem{
    padding: 10px;
    border: solid 0.5px #e6e6e6;
}
.questionContainer{
    display: flex;
    flex-wrap: nowrap;
}
.qTime{
    width: 100%;
    font-size: 12px;
    color: grey;
    margin-left: 15px;
    margin-bottom: 10px;
}
.latestReplyTime{
    margin-top: 5px;
    // line-height: 1.6;
    font-size: 12px;
    color: grey;
    margin-left: 15px;
}
.hotList{
    width: 300px;
    padding: 10px;
    height: 500px;
    border: solid 0.5px #e6e6e6;
}
.answerQues{
    border: 1px solid #229ad1;
}
.ellipsis-dropdown{
    display: flex;
    justify-content: center;
    align-items: center;
}
.ellipsis{
    margin-left: 20px;
    margin-top: 10px;
}
.quill-container{
    height: 210px;
    margin-left: 10px;
    margin-right: 10px;
}
.quill-editor{
    height: 150px;
}
.quill-btn-container{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
}
.answer-quill-container{
    height: 200px;
    margin-top: 10px;
}
.answer-quill-editor{
    height: 140px;
}
.answer-quill-btn-container{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
}

// 一级回答部分
.answerlistWrapper{
    margin-top: 10px;
}
.firstAnswerItem{
    padding: 10px;
    padding-bottom: 2px;
    border: solid 0.5px #e6e6e6;
}
.firstAnswerItem-top-userInfo{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.u-name{
    font-size: 18px;
    font-weight: bold;
    margin-left: 6px;
}
.firstAnswerItem-top-likeNumber{
    font-size: 12px;
    color: grey;
    margin-top: 5px;
}
.firstAnswerItem-content{
    padding: 5px;
    font-size: 16px;
    line-height: 20px;
}
.firstAnswerItem-bottom{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}
.firstAnswerItem-latestReplyTime{
    margin-top: 10px;
    // line-height: 1.6;
    font-size: 12px;
    color: grey;
    margin-left: 15px;
}

// 二级评论
.second-wrapper{
    height: 420px;
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
    flex: 1 1;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>