<template>
    <!-- WRAPPER -->
    <div id="wrapper">
        <div class="vertical-align-wrap">
            <div class="vertical-align-middle">
                <div class="auth-box ">
                    <div class="container">
                        <div class="content">
                            <div class="header">
                                <div class="logo text-center"><img src="../assets/logo.png" width="20%" alt="Q&A"></div>
                            </div>
                            <form class="form-auth-small">
                                <div id="nicknameInfo" style="color:red;font-size:12px;float:left"></div>
                                <div class="form-groups">
                                    <div class="text-font">请填写昵称：</div>
                                    <input @blur="checkNickname()" type="text" class="form-controls" id="nickname"
                                        placeholder="昵称">
                                </div>
                                <div class="form-groups">
                                    <div class="text-font">请选择您的性别：</div>
                                    <select @blur="selectGender()" id="gender" class="form-controls">
                                        <option value="保密">保密</option>
                                        <option value="男">男</option>
                                        <option value="女">女</option>
                                    </select>
                                </div>
                                <div class="form-groups">
                                    <div class="text-font">请上传您的头像：</div>
                                    <img id="pic" style="width:60px;height:60px;border-radius:50%;"
                                        src="../assets/portrait.jpg">
                                    <input name="file" id="upload" style="display: none" type="file" accept="image/*">
                                </div>
                                <div class="form-groups">
                                    <div class="text-font">请填写邮箱：</div>
                                    <div id="emailInfo" style="color:red;font-size:12px;float:left"></div>
                                    <!-- 用于表示语义上的e-mail地址输入域，会自动验证email域的值，外观上与type="text"的input输入类型没有差异，在手机端会唤出英文键盘，email支持multiple属性  [注意]IE9-浏览器及safari浏览器不支持-->
                                    <input @blur="checkEmail()" type="email" class="form-controls" id="email"
                                        placeholder="邮箱">
                                </div>
                                <div class="form-groups">
                                    <div class="text-font">请填写手机号：</div>
                                    <div id="phoneInfo" style="color:red;font-size:12px;float:left"></div>
                                    <!--type='tel': 用来输入电话号码，用于表示语义上的电话输入域，外观上与type="text"的input输入类型没有差异，在手机端会唤出数字键盘-->
                                    <input @blur="checkPhone()" type="tel" class="form-controls" id="phone"
                                        placeholder="手机号">
                                </div>
                                <div class="form-groups">
                                    <div class="text-font">请填写密码：</div>
                                    <div id="passwordInfo" style="color:red;font-size:12px;float:left"></div>
                                    <input @blur="getPassword()" type="password" class="form-controls" id="password"
                                        placeholder="密码">
                                </div>
                                <div class="form-groups">
                                    <div class="text-font">确认密码：</div>
                                    <div id="confirmpasswordInfo" style="color:red;font-size:12px;float:left"></div>
                                    <input @blur="getConfirmpassword()" type="password" class="form-controls"
                                        id="confirmpassword" placeholder="确认密码">
                                </div>
                                <div class="form-groups-specific-identify">
                                    <!-- <div class="text-font">请输入右侧验证码：</div>
                                    <div id="vertificationInfo" style="color:red;font-size:12px;float:left"></div>
                                    <input @blur="getVertification()" type="text" class="form-controls-specific"
                                        id="vertification" placeholder="验证码">
                                    <img src="http://120.26.172.98:8080/QASystem/public/img"> -->
                                    
                                    <!-- 验证码 -->
                                    <div class="identify-container">
                                        <div class="text-font-identify">验证码：</div>
                                        <input type="text" id="code" v-model="code" class="form-controls identify-input" placeholder="请输入您的验证码" />
                                    </div>
                                    <div class="login-code" @click="refreshCode()">
                                        <!--验证码组件-->
                                        <identify :identifyCode="identifyCode"></identify>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary btn-lg btn-block" id="btn" @click="register()">注册</button>
                                <div class="bottom">
                                    <span class="helper-text"> <router-link to="login">已有账号？前往登录</router-link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import identify from './module/identify.vue'
import Qs from 'qs'
var filename="";
var flag=0;
$(function () {
    $("#pic").click(function () {
        $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload").on("change", function () {
            var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#pic").attr("src", objUrl); //将图片路径存入src中，显示出图片
                upimg();
            }
        });
    });
});

//建立一个可存取到file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
};
function upimg() {
    console.log(344)
    var pic = $('#upload')[0].files[0];
    console.log("pic",pic)
    var file = new FormData();
    file.append('image', pic);
    $.ajax({
        url: "http://120.26.172.98:8080/QASystem/user/upload",
        type: "post",
        data: file,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            var res = data;
            filename=data.data;
            flag=1;
            //$("#resimg").append("<img src='/" + res + "'>")
            //callback(filename)
        }
    })
    //return filename;
    console.log(flag);
    console.log(filename);
};
export default {
    data(){
        return{
            identifyCodes: "1234567890",
            identifyCode: "",
            code:"",//text框输入的验证码
        }
    },
    components:{
        identify
    },
    mounted(){
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },
    created(){
        this.refreshCode()
    },
    methods:{
        //验证码
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
                this.randomNum(0, this.identifyCodes.length)
                ];
            }
            console.log('验证码',this.identifyCode);
        },
        checkNickname() {
            var nickname = document.getElementById("nickname").value;
            if( nickname == "" )
        	{
        		$("#nickname").attr('placeholder',"昵称不能为空");
        		$("#nickname").css('borderStyle','solid');
        		$("#nickname").css('borderColor','#FF0000');
        		$("#nickname").css('boxShadow','0 0 15px #FF0000');
        	}
        },
        selectGender() {
            var gender = document.getElementById("gender").value;
        },
        checkEmail() {
            var mail = document.getElementById("email").value;
            var mailInfo = document.getElementById("emailInfo");
            var emailPat = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if( mail == "" )
        	{
        		$("#email").attr('placeholder',"邮箱不能为空");
        		$("#email").css('borderStyle','solid');
        		$("#email").css('borderColor','#FF0000');
        		$("#email").css('boxShadow','0 0 15px #FF0000');
        	}
            else if (!emailPat.test(mail)) {
            	$("#email").attr('placeholder',"不合理的邮件格式");
        		$("#email").css('borderStyle','solid');
        		$("#email").css('borderColor','#FF0000');
        		$("#email").css('boxShadow','0 0 15px #FF0000');
                emailPat.focus();
                return false;
            }
            else {
                mailInfo.innerHTML = "";
            }
        },
        checkPhone() {
            var phone = document.getElementById("phone").value;
            var phonePat = /^1[3456789]\d{9}$/;

            if( phone == "" )
        	{
        		$("#phone").attr('placeholder',"手机号不能为空");
        		$("#phone").css('borderStyle','solid');
        		$("#phone").css('borderColor','#FF0000');
        		$("#phone").css('boxShadow','0 0 15px #FF0000');
        	}
            else if (!phonePat.test(phone)) {
            	$("#phone").attr('placeholder',"不合理的手机号");
        		$("#phone").css('borderStyle','solid');
        		$("#phone").css('borderColor','#FF0000');
        		$("#phone").css('boxShadow','0 0 15px #FF0000');
                phonePat.focus();
                return false;
            } else {
                phoneInfo.innerHTML = "";
            }
        },
        getPassword() {
            var password = document.getElementById("password").value;
        	if( password == "" )
        	{
        		$("#password").attr('placeholder',"密码不能为空");
        		$("#password").css('borderStyle','solid');
        		$("#password").css('borderColor','#FF0000');
        		$("#password").css('boxShadow','0 0 15px #FF0000');
        	}
        	if( password != "" )
        	{
        		$("#password").attr('placeholder',"");
        		$("#password").css('borderColor','');
        		$("#password").css('boxShadow','');
        		$("#password").css('borderStyle','');
        	}
        },
        getConfirmpassword() {
            var password = document.getElementById("password").value;
            var confirmpass = document.getElementById("confirmpassword").value;
            var confirmpasswordInfo = document.getElementById("passwordInfo");
            if( confirmpass == "" )
        	{
        		$("#confirmpassword").attr('placeholder',"确认密码不能为空");
        		$("#confirmpassword").css('borderStyle','solid');
        		$("#confirmpassword").css('borderColor','#FF0000');
        		$("#confirmpassword").css('boxShadow','0 0 15px #FF0000');
        	}
        	if( confirmpass != "" )
        	{
        		$("#confirmpassword").attr('placeholder',"");
        		$("#confirmpassword").css('borderColor','');
        		$("#confirmpassword").css('boxShadow','');
        		$("#confirmpassword").css('borderStyle','');
        	}
            if (password != confirmpass) {
                confirmpasswordInfo.innerHTML = "两次密码不一致";
            }
        },
        getVertification() {
            if(this.code==""){
                // alert('请输入验证码');
                this.$message({
                    message: '请输入验证码!',
                    type: 'warning'
                });
                return;
            }
            if(this.identifyCode!=this.code){
                this.code='';
                this.refreshCode();
                // alert('请输入正确的验证码')
                this.$message({
                    message: '请输入正确的验证码!',
                    type: 'warning'
                });
                return;
            }
            // var vertification = document.getElementById("vertification").value;
            // var vertificationInfo = document.getElementById("vertification");
            // if( vertification == "" )
        	// {
        	// 	$("#vertification").attr('placeholder',"验证码不能为空");
        	// 	$("#vertification").css('borderStyle','solid');
        	// 	$("#vertification").css('borderColor','#FF0000');
        	// 	$("#vertification").css('boxShadow','0 0 15px #FF0000');
        	// }
        	// if( vertification != "" )
        	// {
        	// 	$("#vertification").attr('placeholder',"");
        	// 	$("#vertification").css('borderColor','');
        	// 	$("#vertification").css('boxShadow','');
        	// 	$("#vertification").css('borderStyle','');
        	// }
        },
        register(){
            let data={
                u_name: $("#nickname").val(),
                u_gender: $("#gender").val(),
                u_phone: $("#phone").val(),
                u_email: $("#email").val(),
                u_pass: $("#password").val(),
                picture:"'http://120.26.172.98:8080/QASystem/uploadImages/'+portrait.jpg"
            }
            let _this=this
            console.log(filename);
            console.log(flag);
          	if(flag==0){
                // this.$axios({
                //     method: "post",
                //     url: 'user/register',
                //     data: Qs.stringify(data)
                // })
                // .then(function(res) {
                //     console.log("注册",res);
                //     // console.log(res.data.resultCode)
                //     if(res.data.resultCode==10004){
                //         alert("已向您邮箱发送激活链接，请前往激活");
                //         _this.$router.push('/')
                //     }else if(res.data.resultCode==10005){
                //         _this.$message({
                //         type: 'warning',
                //         message: '注册失败!'
                //         });
                //     }else if(res.data.resultCode==10006){
                //         _this.$message({
                //         type: 'warning',
                //         message: '该手机号已经注册过，可以直接登录!'
                //         });
                //     }else if(res.data.resultCode==10007){
                //         _this.$message({
                //         type: 'warning',
                //         message: '该邮箱已经注册过，可以直接登录!'
                //         });
                //     }else if(res.data.resultCode==10009){
                //         _this.$message({
                //         type: 'warning',
                //         message: '注册信息不全!'
                //         });
                //     }
                // })
                // .catch(function(err) {
                //     console.log(err);
                // })
          		$.ajax({
                    type: "POST",
                    url: "http://120.26.172.98:8080/QASystem/user/register",
                    async:false, 
                    data: {
                    	u_name: $("#nickname").val(),
                    	u_gender: $("#gender").val(),
                    	u_phone: $("#phone").val(),
                        u_email: $("#email").val(),
                        u_pass: $("#password").val(),
                        picture:"'http://120.26.172.98:8080/QASystem/uploadImages/'+portrait.jpg"
                    },
                    success: function (json) {
                    	console.log("注册返回值",json)
                        if (json.resultCode == "10004") {
                            //注册成功
                            alert("已向您邮箱发送激活链接，请前往激活");
                            window.location.href = "login.vue";
                        } else {
                            //注册失败
                            alert(json.resultDesc);
                        }
                    },
                    error: function (jqXHR) {
                        alert("您所请求的页面有异常");
                    }
                });
          	}
          	else if(flag==1){
                // this.$axios({
                //     method: "post",
                //     url: 'user/register',
                //     data: Qs.stringify(data)
                // })
                // .then(function(res) {
                //     console.log("注册",res);
                //     // console.log(res.data.resultCode)
                //     if(res.data.resultCode==10004){
                //         alert("已向您邮箱发送激活链接，请前往激活");
                //         _this.$router.push('/')
                //     }else if(res.data.resultCode==10005){
                //         _this.$message({
                //         type: 'warning',
                //         message: '注册失败!'
                //         });
                //     }else if(res.data.resultCode==10006){
                //         _this.$message({
                //         type: 'warning',
                //         message: '该手机号已经注册过，可以直接登录!'
                //         });
                //     }else if(res.data.resultCode==10007){
                //         _this.$message({
                //         type: 'warning',
                //         message: '该邮箱已经注册过，可以直接登录!'
                //         });
                //     }else if(res.data.resultCode==10009){
                //         _this.$message({
                //         type: 'warning',
                //         message: '注册信息不全!'
                //         });
                //     }
                // })
                // .catch(function(err) {
                //     console.log(err);
                // })
          		$.ajax({
                    type: "POST",
                    url: "http://120.26.172.98:8080/QASystem/user/register",
                    async:false, 
                    data: {
                    	u_name: $("#nickname").val(),
                    	u_gender: $("#gender").val(),
                    	u_phone: $("#phone").val(),
                        u_email: $("#email").val(),
                        u_pass: $("#password").val(),
                        picture:'http://120.26.172.98:8080/QASystem/uploadImages/'+filename
                    },
                    success: function (json) {
                    	console.log("注册成功",json)
                        if (json.resultCode == "10004") {
                            //注册成功
                            alert(json.resultDesc);
                            window.location.href = "login.vue";
                        } else {
                            //注册失败
                            alert(json.resultDesc);
                        }
                    },
                    error: function (jqXHR) {
                        alert("您所请求的页面有异常");
                    }
                });
          	}
        }
    }
}
</script>

<style lang="less" scoped>
@import url('./css/register.css');
/*验证码样式*/
.code{
 width:124px;
 height:31px;
 border:1px solid rgba(186,186,186,1);
}
.login-code{
 cursor: pointer;
}
.identify-container{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.form-groups-specific-identify{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
}
.text-font-identify{
    display: flex;
    justify-content: flex-start;
    width: 208px;
    font-size: 17px;
    font-family: 'Microsoft YaHei';
}
</style>