<template>
    <div>
        <el-button class="askBtn" type="primary" @click="centerDialogVisible = true">提问</el-button>
        <el-dialog
            title="提问"
            :visible.sync="centerDialogVisible"
            width="750px"
            height="500px"
            @close='closeDialog'
            :close-on-click-modal='false'>
            <div class="bigContainer">
                <el-input v-model="input" placeholder="请输入问题标题..."></el-input>
                <div class="container">
                    <quill-editor class="quill-editor" ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                </div>
                <div class="el-btn">
                    <el-button class="editor-btn" type="primary" @click="submit();centerDialogVisible=false">提交</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import Qs from 'qs'
    // import * as Quill from 'quill'  // 引入编辑器
    // import imageResize from 'quill-image-resize-module'
    // Quill.register('modules/imageResize', imageResize)
    export default {
        name: 'editor',
        inject: ['reload'], //注入
        data: function(){
            return {
                centerDialogVisible: false,
                input:'',
                content: '',
                dialogFormVisible:'',
                editorOption: {
                    placeholder: '请具体描述您的问题...',
                    // modules:{
                    //     imageResize:{
                    //         displayStyles:{
                    //             backgroundColor:'black',
                    //             border:'none',
                    //             color:'white'
                    //         },
                    //         modules:['Resize','DisplaySize','Toolbar']
                    //     }
                    // }
                    // 拖拽上传
                    // imageDrop: true,
                    // // 调整图片大小
                    // imageResize: {
                    //     displayStyles: {
                    //         backgroundColor: 'black',
                    //         border: 'none',
                    //         color: 'white'
                    //     }
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            closeDialog(){
                this.content="";
                this.input="";
                location.reload()
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                console.log(this.content.replace(/<[^>]+>/g, ""))
                console.log(window.sessionStorage.getItem('token'))
                // console.log(window.sessionStorage.getItem('token')
                var title=this.input
                var qus=/[\？\?]$/
                console.log('提问问号',qus.test(title))
                if(qus.test(title)){
                    let data = {
                        q_content: this.content.replace(/<[^>]+>/g, ""),
                        q_title: this.input,
                        q_total:this.content,
                        token:window.sessionStorage.getItem('token')
                    }
                    let _this=this
                    // console.log($("#account").val(),$("#password").val())
                    // const {data:res}=await this.$axios.get("public/login",$("#account").val(),$("#password").val())
                    // console.log(res)
                    this.$axios({
                        method: "post",
                        url: 'user/askQuestion',
                        data: Qs.stringify(data)
                    })
                    .then(function(res) {
                        console.log(res)
                        console.log(res.data.resultCode);
                        if(res.data.resultCode==20001){
                            _this.$message.success('提问成功')
                            _this.dialogFormVisible = false
                        }else if(res.data.resultCode==20002){
                            _this.$message.error('提问失败')
                        }else if(res.data.resultCode==20008){
                            _this.$message.warning('内容不合规')
                        }else if(res.data.resultCode==20009){
                            _this.$message.warning('内容疑似违规')
                        }else if(res.data.resultCode==20011){
                            _this.$message.error('失败响应')
                        }else if(res.data.resultCode==1002){
                            _this.$message.error('请先登录')
                        }else if(res.data.resultCode==1003){
                            _this.$message.error('登录过期，请重新登录')
                        }else if(res.data.resultCode==1004){
                            _this.$message.error('登录过期，请重新登录')
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                }else{
                    _this.$message.warning('请在您的问题标题上添加问号')
                }
                
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 30px;
        margin-left: 610px;
    }
    .container{
        width: 680px;
        height: 250px;
    }
    .quill-editor{
        width: 650px;
        height: 200px;
    }
    .bigContainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .el-btn{
        display: flex;
        justify-content: flex-end;
    }
    .el-input{
        width: 650px;
        margin-bottom: 10px;
    }
</style>