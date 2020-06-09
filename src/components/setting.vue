<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <div class="main-container">
            <div class="userInfo">
                <div class="crop-demo">
                    <img :src="cropImg" class="pre-img">
                    <div class="crop-demo-btn">修改头像
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
                <div class="userNickname">{{u_name}}</div>
            </div>
            <div class="setting-container">
                <div class="setting-item">
                    <div class="note-text">账号设置</div>
                    <div class="note-text-1">注意：为保证账号安全，修改时需进行身份验证</div>
                </div>
                <div class="setting-item-1">
                    <div class="setting-item-content">
                        <div class="note-text">手机号</div>
                        <div class="note-text-2" v-if="flag_phone" @change="verify()">{{u_phone}}</div>
                        <div v-else class="modify-input" @change="verify();completeEdit_phone()">
                            <el-input v-model="input_phone"></el-input>
                            <el-button class="submit" type="primary" @click="changePhone()">提交</el-button>
                        </div>
                    </div>
                    <div class="setting-item-action">
                        <el-button type="text" v-if="flag_phone" @change="verify()" @click="dialogVisible = true">编辑</el-button>
                        <el-button type="text" v-else @change="verify();completeEdit_phone()" @click="completeEdit_phone()">完成编辑</el-button>
                    </div>
                </div>
                <div class="setting-item-1">
                    <div class="setting-item-content">
                        <div class="note-text">邮箱</div>
                        <div class="note-text-2" v-if="flag_email" @change="verify()">{{u_email}}</div>
                        <div v-else class="modify-input" @change="verify();completeEdit_email()">
                            <el-input v-model="input_email"></el-input>
                            <el-button class="submit" type="primary" @click="changeEmail()">提交</el-button>
                        </div>
                    </div>
                    <div class="setting-item-action">
                        <el-button type="text" v-if="flag_email" @click="dialogVisible = true" @change="verify()">编辑</el-button>
                        <el-button type="text" v-else @change="verify();completeEdit_email()" @click="completeEdit_email()">完成编辑</el-button>
                    </div>
                </div>
                <div class="setting-item-1">
                    <div class="setting-item-content">
                        <div class="note-text">密码</div>
                        <div class="note-text-2" v-if="flag_password" @change="verify()">已设置</div>
                        <div v-else class="modify-input" @change="verify();completeEdit_password()">
                            <el-input v-model="input_password" placeholder="请输入新密码" show-password></el-input>
                            <el-button class="submit" type="primary" @click="changePassword()">提交</el-button>
                        </div>
                    </div>
                    <div class="setting-item-action">
                        <el-button type="text" @click="dialogVisible = true" @change="verify()" v-if="flag_password">编辑</el-button>
                        <el-button type="text" v-else @change="verify();completeEdit_password()" @click="completeEdit_password()">完成编辑</el-button>
                    </div>
                </div>
                <el-dialog
                    title="身份验证"
                    :visible.sync="dialogVisible"
                    width="40%"
                    center
                    :close-on-click-modal='false'>
                    <div>
                        <div class="identify-note">
                            在您进行下一步操作之前，需先进行身份验证
                        </div>
                        <div class="identify-email">
                            使用邮箱{{u_email}}进行验证
                        </div>
                        <div class="identify-wrapper">
                            <el-input class="identify-input" v-model="input_identify" placeholder="请输入验证码"></el-input>
                            <el-button @click="getVerification()" type="primary">获取验证码</el-button>
                        </div>
                        <div class="identify-button-wrapper">
                            <el-button class="identify-button" @click="verify()" type="primary">验证</el-button>
                        </div>
                    </div>
                </el-dialog>
            </div> 
        </div>
    </el-container>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import VueCropper  from 'vue-cropperjs';
import myHeader from '../components/module/header.vue'
import Qs from 'qs'
export default {
    components: {
        myHeader,
        VueCropper,
    },
    data(){
        return{
            portrait:'',
            u_name:'',
            u_phone:'',
            u_email:'',
            flag_phone:true,
            flag_email:true,
            flag_password:true,
            dialogVisible:false,
            imageUrl: '',
            cropImg: '',
            picDialogVisible: false,
            // defaultSrc: require('../assets/portrait.jpg'),
            defaultSrc:'',
            fileList: [],
            imgSrc: '',
            input_identify:'',
            input_email:'',
            input_phone:'',
            input_password:'',
        }
    },
    methods:{
        changePhone(){
            let data={
                token:window.sessionStorage.getItem('token'),
                phone:this.input_phone
            }
            // console.log(data)
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/changePhone',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("修改手机号",res);
                if(res.data.resultCode==20025){
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else if(res.data.resultCode==20026){
                    _this.$message.error('修改失败，请稍后再试');
                }else if(res.data.resultCode==10006){
                    _this.$message.error('该手机号已经注册过,请直接登录或者等待管理员的审核');
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        changeEmail(){
            let data={
                token:window.sessionStorage.getItem('token'),
                email:this.input_email
            }
            // console.log(data)
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/changeEmail',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("修改邮箱",res);
                if(res.data.resultCode==20025){
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else if(res.data.resultCode==20026){
                    _this.$message.error('修改失败，请稍后再试');
                }else if(res.data.resultCode==10007){
                    _this.$message.error('该邮箱已经注册过，可以直接登录或者等待管理员的审核');
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        changePassword(){
            let data={
                token:window.sessionStorage.getItem('token'),
                pass:this.input_password
            }
            console.log(data)
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/changePass',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("修改密码",res);
                if(res.data.resultCode==20025){
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else if(res.data.resultCode==20026){
                    _this.$message.error('修改失败，请稍后再试');
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.picDialogVisible = true;
                this.imgSrc = event.target.result;
                // console.log('imgSrc',this.imgSrc)
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                // console.log(event.target.result)
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            // console.log('cropImg',this.cropImg)
        },
        cancelCrop(){
            this.picDialogVisible = false;
            this.cropImg = this.defaultSrc;
        },
        imageuploaded(res) {
            // console.log('修改后头像路径',this.cropImg)
            let data={
                token:window.sessionStorage.getItem('token'),
                icon:this.cropImg
            }
            // console.log(data)
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/changeicon',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                // console.log("修改头像",res);
                if(res.data.resultCode==20025){
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else if(res.data.resultCode==20026){
                    _this.$message.error('修改失败，请稍后再试');
                }
                    location.reload()
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        handleError(){
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        },
        getVerification(){
            let data={
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getCode',
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
                }else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                    _this.$message({
                        message: '登录失效，请重新登录',
                        type: 'warning'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        verify(){
            let data={
                token: window.sessionStorage.getItem('token'),
                code:this.input_identify
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/Verification',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("是否验证成功",res);
                if(res.data.resultCode==20023){
                    // _this.$message({
                    //     message: '验证成功',
                    //     type: 'success'
                    // });
                    _this.dialogVisible=false
                    _this.flag_phone=false
                    _this.flag_email=false
                    _this.flag_password=false
                }else if(res.data.resultCode==20024){
                    _this.$message.error('验证失败')
                }else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                    _this.$message({
                        message: '登录失效，请重新登录',
                        type: 'warning'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        completeEdit_phone(){
            this.flag_phone=true
        },
        completeEdit_email(){
            this.flag_email=true
        },
        completeEdit_password(){
            this.flag_password=true
        },
        getUserInfo(){
            let data = {
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            var n=[]
            this.$axios({
                method: "post",
                url: 'user/getUserInfo',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("个人界面-用户信息",res);
                if(res.data.resultCode==20006){
                    _this.u_name=res.data.data.u_name
                    _this.defaultSrc=res.data.data.u_icon
                    _this.cropImg=res.data.data.u_icon
                    // console.log('头像',res.data.data.u_icon)
                    // var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim; 
                    // n=reg.exec(uIcon)
                    // var n=nickName.split('"')
                    // console.log('n',n)
                    // var imgSrc=n[2]
                    // _this.portrait=imgSrc
                    // console.log('头像2',_this.portrait)
                    var phone=res.data.data.u_phone
                    _this.input_phone=phone
                    console.log('phone',phone)
                    var email=res.data.data.u_email
                    _this.input_email=email
                    console.log('email',email)
                    const ref = /(.{4}).+(.{3}.+)/g;
                    phone = phone.replace(ref,"$1****$2");
                    console.log('加密后的手机号',phone)
                    _this.u_phone=phone
                    const ref1 =/(.{1}).+(.{2}@.+)/g;
                    email =email.replace(ref1,"$1****$2");
                    console.log('加密后的邮箱',email)
                    _this.u_email=email
                }else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                    _this.$message({
                        message: '登录失效，请重新登录',
                        type: 'warning'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
    },
    created(){
        this.getUserInfo();
    },
    mounted(){
        this.cropImg = this.defaultSrc;
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
    width: 1060px;
    padding-bottom: 20px;
    margin: 0 auto;
}
.userInfo{
    padding-left: 20px;
    margin-top: 20px;
    width: 100%;
    border: solid 1px #e6e6e6;
    height: 140px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.userIcon{
    margin-left: 10px;
}
.userNickname{
    margin-left: 30px;
    font-weight: bold;
    font-size: 24px;
} 
.setting-container{
    margin-top: 20px;
    height: auto;
    border-top: solid 1px #e6e6e6;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
}
.setting-item-1{
    height: 100px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 20px;
    // align-items: flex-start;
}
.setting-item{
    height: 80px;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
}
.setting-item-content{
    width: 95%;
    display: flex;
    flex-wrap: wrap;
}
.setting-item-action{
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}
.note-text{
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.note-text-1{
    font-size: 14px;
    color: gray;
    width: 100%;
}
.note-text-2{
    font-size: 14px;
    color: grey;
    width: 100%;
}
.el-dialog--center .el-dialog__body{
    padding:0 25px 30px;
}
.identify-note{
    font-size:14px;
    color:rgb(146, 146, 146);
    display:flex;
    justify-content:center;
}
.identify-email{
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
// 上传头像
.content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img{   
    width: 80px;
    height: 80px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-top: 10px;
}
.crop-demo{
    width: 80px;
    display: flex;
    /* align-items: flex-end; */
    flex-wrap: wrap;
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
.modify-input{
    margin-top: 5px;
    display: flex;
}
.submit{
    margin-left: 10px;
    // margin-bottom: 10px;
    height: 40px;
}
</style>