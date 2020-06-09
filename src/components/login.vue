<template>
    <!-- WRAPPER -->
	<div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle">
				<div class="auth-box-login ">
                    <div class="left">
                        <div class="content">
                            <div class="header">
                                <div class="logo text-center"><img src="../assets/logo.png" width="50%" alt="Q&A"></div>
                            </div>
                            <form class="form-auth-small" >
                                <div class="form-group">
                                    <div id="accountInfo" style="color:red;font-size:12px;float:left"></div>
                                    <input class="form-control" id="account" @blur="checkAccount()"  placeholder="手机号/邮箱">
                                </div>
                                <div class="form-group">
                                    <div id="passwordInfo" style="color:red;font-size:12px;float:left"></div>
                                    <input type="password" class="form-control" id="password" @blur="checkPassword()" placeholder="密码">
                                </div>
                                <div class="form-group">
                                    <div>
                                        <button id="login" @click="login()" type="button" class="btn btn-primary btn-lg btn-block-login">登录</button>
                                    </div>
                                    <div>
                                        <button @click="vistorLogin()" id="visitorlogin" type="button" class="btn btn-primary-2 btn-block-login" style="color: white; width:100%">游客身份进入</button>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <span class="helper-text"> <router-link to="register">没有账号？前往注册</router-link></span>
                                    <el-button class="button-text" type="text" @click="dialogVisible=true">忘记密码</el-button>
                                    <el-dialog
                                        title="忘记密码"
                                        :visible.sync="dialogVisible"
                                        width="40%"
                                        :close-on-click-modal='false'>
                                        <div>
                                            <div class="identify-note">
                                                请输入您的邮箱以获取验证码
                                            </div>
                                            <div class="identify-email">
                                                <el-input class="inputEmail" v-model="input_email" placeholder="请输入您的邮箱"></el-input>
                                                <el-button @click="getVerification()" type="primary">获取验证码</el-button>
                                            </div>
                                            <div class="identify-wrapper">
                                                <el-input class="identify-input" v-model="input_identify" placeholder="请输入验证码"></el-input>
                                            </div>
                                            <div class="identify-button-wrapper">
                                                <el-button class="identify-button" @click="verify()" type="primary">验证</el-button>
                                            </div>
                                        </div>
                                    </el-dialog>
                                    <el-dialog
                                        title="重新输入密码"
                                        :visible.sync="secondDialog"
                                        width="40%"
                                        :close-on-click-modal='false'
                                        append-to-body>
                                        <div>
                                            <el-input show-password class="newPassword-input" v-model="newPassword" placeholder="请重新输入密码"></el-input>
                                            <el-input show-password v-model="configPassword" placeholder="请再次输入密码"></el-input>
                                            <div class="button-container">
                                                <el-button type="primary" @click="changePassword();secondDialog=false;dialogVisible=false">确认</el-button>
                                                <el-button show-password type="primary" @click="secondDialog=false;dialogVisible=false">取消</el-button>
                                            </div>
                                        </div>
                                    </el-dialog>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="right">
                        <div class="overlay"></div>
                        <div class="content text">
                            <h1 class="heading" ><b>在线问答系统</b></h1>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
			</div>
		</div>
	</div>
	<!-- END WRAPPER -->
</template>

<script>
import $ from 'jquery';
import Qs from 'qs';
export default {
    data(){
        return{
            input_email:'',
            input_identify:'',
            newPassword:'',
            configPassword:'',
            secondDialog:false,
            dialogVisible:false,
            loginData:{
                account:$("#account").val(),
                password:$("#password").val()
            }
        }
    },
    methods:{
        getVerification(){
            let data={
                u_email: this.input_email
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getCode1',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("获取验证码",res);
                if(res.data.resultCode==20021){
                    _this.$message({
                        message: '获取验证码成功，请前往邮箱查看',
                        type: 'success'
                    });
                }else if(res.data.resultCode==20022){
                    _this.$message.error('获取验证码失败，请稍后再试')
                }else if(res.data.resultCode==10002){
                    _this.$message({
                        message: '获取验证码失败，该用户尚未注册成功',
                        type: 'error'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        verify(){
            let data={
                u_email: this.input_email,
                code:this.input_identify
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/Verification1',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("是否验证成功",res);
                if(res.data.resultCode==20023){
                    _this.$message.success('验证成功')
                    _this.secondDialog=true
                }else if(res.data.resultCode==20024){
                    _this.$message.error('验证失败')
                }else if(res.data.resultCode==10002||res.data.resultCode==1003||res.data.resultCode==1004){
                    _this.$message({
                        message: '验证失败，无该用户',
                        type: 'error'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        changePassword(){
            if(this.newPassword!=this.configPassword){
                this.$message.warning('两次密码输入不一致')
            }else{
                let data={
                    u_email: this.input_email,
                    pass:this.newPassword
                }
                // console.log(data)
                let _this=this
                this.$axios({
                    method: "post",
                    url: 'user/changePass1',
                    data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log("修改密码",res);
                    if(res.data.resultCode==20025){
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }else if(res.data.resultCode==1001){
                        _this.$message.error('参数不全');
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            }
        },
		checkAccount(){
            var account = document.getElementById("account").value;
            if( account == "" )
            {
                $("#account").attr('placeholder',"手机号/邮箱不能为空");
                $("#account").css('borderStyle','solid');
                $("#account").css('borderColor','#FF0000');
                $("#account").css('boxShadow','0 0 15px #FF0000');
            }
        },
        checkPassword(){
            var password = document.getElementById ("password").value;
            if( password == "" )
            {
                $("#password").attr('placeholder',"密码不能为空");
                $("#password").css('borderStyle','solid');
                $("#password").css('borderColor','#FF0000');
                $("#password").css('boxShadow','0 0 15px #FF0000');
            }
        },
        login(){
            let data = {
                account: $("#account").val(),
                password: $("#password").val()
            }
            let _this=this;
            this.$axios({
                method: "post",
                url: 'public/login',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log('登录',res);
                if(res.data.resultCode==10000){
                    console.log(res.data.data);
                    window.sessionStorage.setItem('token',res.data.data.token)
                    window.sessionStorage.setItem('u_id',res.data.data.u_id)
                    _this.$router.push('/')
                }else if(res.data.resultCode==10001){
                    alert('登录失败_账号或密码错误')
                }else if(res.data.resultCode==10002){
                    alert('登录失败_用户不存在')
                }else if(res.data.resultCode==10003){
                    alert('登录失败_账号或密码为空')
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        vistorLogin(){
            // window.location.href = "";
            let _this=this;
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
@import url('./css/main.css');
@import url('./css/bootstrap.css');
.buttonArea{
    display: flex;
    flex-wrap: wrap;
}
.bottom{
    display: flex;
    flex-wrap: wrap;
}
.helper-text{
    width: 100%;
}
// .el-button{
//     padding: 0;
// }
.button-text{
    padding: 0;
    margin: 0 auto;
    margin-top: 3px;
    color: #229ad1;
}
.identify-note{
    font-size:14px;
    color:rgb(146, 146, 146);
    display:flex;
    justify-content:center;
}
.identify-email{
    display: flex;
    font-size:15px;
    color: rgb(73, 73, 73);
    line-height:20px;
    margin:10px 0;
}
.identify-wrapper{
    display: flex;
}
.identify-input{
    margin-right: 15px;
}
.identify-button-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
}
.identify-button{
    font-size: 15px;
    width: 120px;
}
.inputEmail{
    margin-right: 10px;
}
.newPassword-input{
    margin-bottom: 10px;
}
.button-container{
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>