<template>
    <div>
        <el-button type="text" class="little-el-button" @click="replyAnswerDialogVisible=true">
            <div class="actionInner">
                <span>
                    <img src="../../assets/huifu.png" width="15px">
                </span>
                <div class="little-text">
                    回复
                </div>
            </div>
        </el-button>
        <el-dialog
                title="回复"
                :visible.sync="replyAnswerDialogVisible"
                width="50%"
                center
                @close='closeDialog'
                :close-on-click-modal='false'
                append-to-body>
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入回复内容"
                    v-model="textarea">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="replyAnswerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="replyAnswerDialogVisible = false;submitSecondAnswer()">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    name:'replyAnswer',
    props:['q_id'],
    data(){
        return{
            replyAnswerDialogVisible:false,
            textarea:''
        }
    },
    methods:{
        closeDialog(){
            this.textarea="";
            // this.reload()
        },
        submitSecondAnswer(q_id){
            // var q_id=this.q_id
            console.log('写评论对应的回答id',this.q_id)
            let _this=this
            let data = {
                q_content: this.textarea,
                q_parent_id: this.q_id,
                q_total: this.textarea,
                token: window.sessionStorage.getItem('token')
            }
            this.$axios({
                method: "post",
                url: 'user/reply',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log('回复',res);
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
    }
}
</script>

<style lang="less" scoped>
.little-el-button{
    padding: 0;
    margin-top: 3px;
    margin-left: 10px;
}
.little-text{
    margin-left: 3px;
    font-size: 11px;
    color: #229ad1;
}
.actionInner{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
.isReply{
    display: flex;
    flex-wrap: nowrap;
}
</style>