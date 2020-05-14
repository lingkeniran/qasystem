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
                                <div class="form-groups-portrait">
                                    <div class="text-font">请上传您的头像：</div>
                                    <div class="crop-demo">
                                        <img :src="cropImg" class="pre-img">
                                        <div class="crop-demo-btn">上传头像
                                            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                                        </div>
                                    </div>
                                
                                    <el-dialog title="裁剪图片" :visible.sync="picDialogVisible" width="30%">
                                        <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="cancelCrop">取 消</el-button>
                                            <el-button type="primary" @click="picDialogVisible = false;imageuploaded()">确 定</el-button>
                                        </span>
                                    </el-dialog>
                                    <!-- <img id="pic" style="width:60px;height:60px;border-radius:50%;"
                                        src="../assets/portrait.jpg">
                                    <input name="file" id="upload" style="display: none" type="file" accept="image/*"> -->
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
import 'cropperjs/dist/cropper.css';
import VueCropper  from 'vue-cropperjs';
import identify from './module/identify.vue'
import Qs from 'qs'
var filename="";
var flag=0;
// $(function () {
//     $("#pic").click(function () {
//         $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
//         $("#upload").on("change", function () {
//             var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
//             if (objUrl) {
//                 $("#pic").attr("src", objUrl); //将图片路径存入src中，显示出图片
//                 upimg();
//             }
//         });
//     });
// });

// //建立一个可存取到file的url
// function getObjectURL(file) {
//     var url = null;
//     if (window.createObjectURL != undefined) { // basic
//         url = window.createObjectURL(file);
//     } else if (window.URL != undefined) { // mozilla(firefox)
//         url = window.URL.createObjectURL(file);
//     } else if (window.webkitURL != undefined) { // webkit or chrome
//         url = window.webkitURL.createObjectURL(file);
//     }
//     return url;
// };
// function upimg() {
//     console.log(344)
//     var pic = $('#upload')[0].files[0];
//     console.log("pic",pic)
//     var file = new FormData();
//     file.append('image', pic);
//     $.ajax({
//         url: "http://120.26.172.98:8080/QASystem/user/upload",
//         type: "post",
//         data: file,
//         cache: false,
//         contentType: false,
//         processData: false,
//         success: function (data) {
//             console.log(data);
//             var res = data;
//             filename=data.data;
//             flag=1;
//             //$("#resimg").append("<img src='/" + res + "'>")
//             //callback(filename)
//         }
//     })
//     //return filename;
//     console.log(flag);
//     console.log(filename);
// };
export default {
    data(){
        return{
            identifyCodes: "1234567890",
            identifyCode: "",
            code:"",//text框输入的验证码
            cropImg: ' data:image/png;base64,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',
            picDialogVisible: false,
            defaultSrc: ' data:image/png;base64,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',
            // defaultSrc:'',
            fileList: [],
            imgSrc: '',
            input_identify:''
        }
    },
    components:{
        identify,
        VueCropper,
    },
    mounted(){
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        this.cropImg = this.defaultSrc;
    },
    created(){
        this.refreshCode()
    },
    methods:{
        // 上传头像
        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.picDialogVisible = true;
                this.imgSrc = event.target.result;
                console.log('imgSrc',this.imgSrc)
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                console.log(event.target.result)
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            console.log('cropImg',this.cropImg)
        },
        cancelCrop(){
            this.picDialogVisible = false;
            this.cropImg = this.defaultSrc;
        },
        imageuploaded(res) {
            console.log('修改后头像路径',this.cropImg)
            let data={
                token:window.sessionStorage.getItem('token'),
                icon:this.cropImg
            }
            // console.log(data)
            let _this=this
            // this.$axios({
            //     method: "post",
            //     url: 'user/changeicon',
            //     data: Qs.stringify(data)
            // })
            // .then(function(res) {
            //     console.log("修改头像",res);
            //     if(res.data.resultCode==20025){
            //         _this.$message({
            //             message: '修改成功',
            //             type: 'success'
            //         });
            //     }else if(res.data.resultCode==20026){
            //         _this.$message.error('修改失败，请稍后再试');
            //     }
            //         location.reload()
            // })
            // .catch(function(err) {
            //     console.log(err);
            // })
        },
        handleError(){
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        },
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
                // emailPat.focus();
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
                picture:this.cropImg
            }
            let _this=this
            console.log(this.cropImg);
            // console.log(flag);
          	// if(flag==0){
            this.$axios({
                method: "post",
                url: 'user/register',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("注册",res);
                // console.log(res.data.resultCode)
                if(res.data.resultCode==10004){
                    alert("已向您邮箱发送激活链接，请前往激活");
                    _this.$router.push('/login')
                }else if(res.data.resultCode==10005){
                    _this.$message({
                    type: 'warning',
                    message: '注册失败!'
                    });
                }else if(res.data.resultCode==10006){
                    _this.$message({
                    type: 'warning',
                    message: '该手机号已经注册过，可以直接登录!'
                    });
                }else if(res.data.resultCode==10007){
                    _this.$message({
                    type: 'warning',
                    message: '该邮箱已经注册过，可以直接登录!'
                    });
                }else if(res.data.resultCode==10009){
                    _this.$message({
                    type: 'warning',
                    message: '注册信息不全!'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
          		// $.ajax({
                //     type: "POST",
                //     url: "http://120.26.172.98:8080/QASystem/user/register",
                //     async:false, 
                //     data: {
                //     	u_name: $("#nickname").val(),
                //     	u_gender: $("#gender").val(),
                //     	u_phone: $("#phone").val(),
                //         u_email: $("#email").val(),
                //         u_pass: $("#password").val(),
                //         picture:"'http://120.26.172.98:8080/QASystem/uploadImages/'+portrait.jpg"
                //     },
                //     success: function (json) {
                //     	console.log("注册返回值",json)
                //         if (json.resultCode == "10004") {
                //             //注册成功
                //             alert("已向您邮箱发送激活链接，请前往激活");
                //             window.location.href = "login.vue";
                //         } else {
                //             //注册失败
                //             alert(json.resultDesc);
                //         }
                //     },
                //     error: function (jqXHR) {
                //         alert("您所请求的页面有异常");
                //     }
                // });
          	// }
          	// else if(flag==1){
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
          	// 	$.ajax({
            //         type: "POST",
            //         url: "http://120.26.172.98:8080/QASystem/user/register",
            //         async:false, 
            //         data: {
            //         	u_name: $("#nickname").val(),
            //         	u_gender: $("#gender").val(),
            //         	u_phone: $("#phone").val(),
            //             u_email: $("#email").val(),
            //             u_pass: $("#password").val(),
            //             picture:'http://120.26.172.98:8080/QASystem/uploadImages/'+filename
            //         },
            //         success: function (json) {
            //         	console.log("注册成功",json)
            //             if (json.resultCode == "10004") {
            //                 //注册成功
            //                 alert(json.resultDesc);
            //             } else {
            //                 //注册失败
            //                 alert(json.resultDesc);
            //             }
            //         },
            //         error: function (jqXHR) {
            //             alert("您所请求的页面有异常");
            //         }
            //     });
          	// }
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
.form-groups-portrait{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 80px;
    justify-content:space-between;
}
.text-font-identify{
    display: flex;
    justify-content: flex-start;
    width: 208px;
    font-size: 17px;
    font-family: 'Microsoft YaHei';
}
// 上传头像
.content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img{   
    width: 60px;
    height: 60px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-top: 10px;
}
.crop-demo{
    width: auto;
    display: flex;
    /* align-items: flex-end; */
    flex-wrap: nowrap;
    align-items: center;
}
.crop-demo-btn{
    position: relative;
    width: 80px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    margin: 5px auto;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>