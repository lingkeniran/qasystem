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
import Qs from 'qs'
// $('#login').click(function(){
    
// }); 
// $("#visitorlogin").click(function(){
//     window.location.href="index.html"
// })
export default {
    data(){
        return{
            loginData:{
                account:$("#account").val(),
                password:$("#password").val()
            }
        }
    },
    methods:{
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
            let _this=this
            // console.log($("#account").val(),$("#password").val())
            // const {data:res}=await this.$axios.get("public/login",$("#account").val(),$("#password").val())
            // console.log(res)
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
            // $.ajax({		
            //     type:"POST",
            //     // dataType : "jsonp",//数据类型为jsonp 
            //     url:"http://120.26.172.98:8080/QASystem/public/login",
            //     data: {
            //         account: $("#account").val(),
            //         password:$("#password").val()
            //     },
            //     success: function(json){
            //         console.log(json);
            //         if(json.resultCode=="10000")
            //         {
            //             //成功
            //             console.log(json.resultDesc);
            //             //存储用户信息
            //             // $.session.set('account',$("#account").val());
            //             // window.location.href = "";
            //             // this.$router.push({path:'/'})
                            
            //         }	
            //         else
            //         {
            //             alert(json.resultDesc);
            //         }
            //     },
            //     error: function(jqXHR){
            //         alert("您所请求的页面有异常");
            //     }
            // });
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
// @import url('./css/bootstrap.min.css');
// .container{
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }
// .el-container{
//     width: 800px;
//     height: 500px;
//     border: solid 1px #e6e6e6;
//     margin: 0 auto;
//     border-radius: 3px;
//     // position: absolute;
//     // left: 50%;
//     // right: 50%;
//     // transform: translate(-50%,-50%);
// }
</style>