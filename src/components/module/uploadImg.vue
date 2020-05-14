<template>
    <div>
        <div class="crop-demo">
            <img :src="cropImg" class="pre-img">
            <div class="crop-demo-btn">选择图片
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
    </div>
</template>

<script>
    import 'cropperjs/dist/cropper.css';
    import VueCropper  from 'vue-cropperjs';
    export default {
        name: 'upload',
        data: function(){
            return {
                defaultSrc: require('../../assets/portrait.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                picDialogVisible: false,
            }
        },
        components: {
            VueCropper
        },
        methods:{
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
                console.log('imageuploaded',this.cropImg)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        width: 100px;
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
</style>