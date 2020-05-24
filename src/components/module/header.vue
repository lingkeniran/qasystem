<template>
    <!--头部目录区-->
    <div class="el-header-container">
        <div class="el-header">
            <div class="logo">
                <router-link to="/"><img src="../../assets/logo.png" alt="Q&A" width="100%"></router-link>
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" @click="toIndex()">首页</el-menu-item>
                <!-- <el-menu-item index="2">问题列表</el-menu-item> -->
            </el-menu>
            <div class="askQues-container">
                <el-input placeholder="搜索问题" v-model="content" >
                <!-- <img src="../assets/sousuo.png" slot="suffix"> -->
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchQues()"></i>
                </el-input>
                <editorDialog class="askBtn"></editorDialog>
            </div>
            <div v-if="isLogin">
                <el-dropdown>
                    <span  @click="gotoMessage()">
                        <el-badge :value="message_notread" :max="99" class="item">
                            <img class="img_message" src="../../assets/xiaoxi.png" alt="消息">
                        </el-badge>
                    </span>
                    <el-dropdown-menu v-if="message_notread===0">
                        <el-dropdown-item>没有未读消息</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu slot="dropdown" v-else>
                        <el-dropdown-item v-for="item in five_messageList" :key="item.um_id">
                            <div class="message_wrapper">
                                <div class="message_content">{{item.um_content}}</div>
                                <div class="message_time">{{item.um_time}}</div> 
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown>
                    <span>
                        <img class="img_portrait" :src="portrait" alt="头像">
                        <!-- <img src="../../assets/01.jpg" width="36px" height="36px" style="border-radius:25px"> -->
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div class="dropdownItem" @click="gotoUserPage()">
                                <img class="littleIcon" src="../../assets/yonghu.png">
                                个人主页
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div class="dropdownItem" @click="gotoSetting()">
                                <img class="littleIcon" src="../../assets/shezhi.png">
                                设置
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div class="dropdownItem" @click="logout()">
                                <img class="littleIcon" src="../../assets/tuichu.png">
                                退出
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-if="nonLogin">
                <el-link type="primary" class="text"><router-link to="login">登录</router-link></el-link>
                <span class="text">/</span>
                <el-link type="primary" class="text"><router-link to="register">注册</router-link></el-link>
            </div>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
import editorDialog from './editorDialog.vue'
import Qs from 'qs'
export default {
    name:'myHeader',
    data(){
        return{
            centerDialogVisible: false,
            isLogin:'',
            nonLogin:'',
            portrait:'',
            content:'',
            message_notread:'', //未读消息数
            five_messageList:[]
        }
    },
    created(){
        this.isUserLogin()
        this.getUserInfo()
        this.getMessage()
    },
    methods:{
        getMessage(){
            let data = {
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getFiveMessage',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("5条未读消息",res);
                _this.five_messageList=res.data.data
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        isUserLogin(){
            // console.log(window.sessionStorage.getItem('token'))
            var token=window.sessionStorage.getItem('token')
            console.log('token',token)
            if(token==null||token==undefined||token==""){
                this.nonLogin=true
            }else{
                this.isLogin=true
            }
            console.log(this.isLogin)
        },
        gotoUserPage(){
            let _this=this
            _this.$router.push('/userpage/activeQuestions')
        },
        gotoSetting(){
            let _this=this
            _this.$router.push('/setting')
        },
        logout(){
            window.sessionStorage.clear()
            let _this=this
            _this.$router.push('/login')
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
                console.log("用户信息",res);
                // console.log(res.data.data.u_icon)
                if(res.data.resultCode==20006){
                    _this.portrait=res.data.data.u_icon
                    _this.message_notread=res.data.data.u_message_not_read
                }else if(res.data.resultCode==20007){
                    // console.log(res.resultCode)
                    _this.$message.error('加载失败，请稍后再试')
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        toIndex(){
            let _this=this
            _this.$router.push('/')
        },
        gotoMessage(){
            let _this=this
            _this.$router.push('/message')
        },
        searchQues(){
            let _this=this
            _this.$router.push({
                path:'/search',
                name:'search',
                //参数
                query:{
                    content:_this.content,
                    // dataObj:{}
                }
            })
        }
    }, 
    components:{
        editorDialog
    }
}
</script>

<style lang="less" scoped>
.el-header-container{
    width: 100%;
}
.el-header{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0 60px;
}
.logo{
    width: 130px;
    margin-right: 20px;
    display: flex;
    align-items: center;
}
.el-menu-item{
    font-weight: bold;
    font-size: 18px;
    // margin-left: 10px;
    // margin-right: 10px;
}
.dropdownItem{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.littleIcon{
    height: 20px;
    width: 20px;
    margin-right: 5px;
}
.askQues-container{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.el-input{
    // margin-left: 50px;
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.el-menu.el-menu--horizontal{
     border-bottom:white;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.line{
    border-bottom:solid 1px #e6e6e6;
}
.el-button{
    margin-right: 120px;
}
.img_message{
    height:30px;
    /* // margin-right: 20px; */
}
.img_portrait{
    height:30px;
    width: 30px;
    margin-right: 20px;
}
.configBtn{
    margin-right: 30px;;
}
.askBtn{
    margin-right: 60px;
}
.text{
    font-size: 16px;
    margin-right: 10px;
    color: #229ad1;
}
.message_wrapper{
    display: flex;
    align-items: center;
}
.message_content{
    width: 160px;
    white-space:nowrap;
    overflow: hidden;
    margin-right: 8px;
    text-overflow:ellipsis; //text-overflow 属性规定当文本溢出包含元素时发生的事情。ellipsis:显示省略符号来代表被修剪的文本。
}
.message_time{
    font-size: 12px;
    color: grey;
}
</style>