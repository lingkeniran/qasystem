<template>
    <div>
        <el-button class="content-question-title-button" type="primary" @click="centerDialogVisible = true">申诉</el-button>
        <el-dialog
            title="申诉"
            :visible.sync="centerDialogVisible"
            width="50%"
            center
            @close='closeDialog'
            :close-on-click-modal='false'>
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入申诉理由"
                v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false;appealQuestion()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    name:'appealQuestion',
    props:['q_id'],
    data(){
        return{
            centerDialogVisible:false,
            textarea:'',
            q_id:this.q_id
        }
    },
    methods:{
        closeDialog(){
            this.textarea="";
        },
        appealQuestion(){
            // console.log('申诉问题的id',e)
            let _this=this
            let data = {
                q_id: this.q_id,
                qa_content: _this.textarea,
                token: window.sessionStorage.getItem('token')
            }
            var token=window.sessionStorage.getItem('token')
            if(token==null||token==undefined||token==""){
                _this.$message.error('请先登录')
            }
            if(_this.textarea==""){
                _this.$message.error('申诉内容不能为空！')
            }
            if(token!=null||token!=undefined||token!="")
            {
                this.$axios({
                method: "post",
                url: 'user/appealQuestion',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log('申诉',res)
                    if(res.data.resultCode==20027){
                        _this.$message({
                            type: 'success',
                            message: '申诉提交成功!'
                        })
                    }
                    else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message.error('登录失效，请重新登录')
                    }else if(res.data.resultCode==20028){
                        _this.$message({
                            type: 'warning',
                            message: '申诉待审核，请勿重复提交!'
                        })
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            }
        },
    }
}
</script>

<style lang="less" scoped>
.content-question-title-button{
    margin-top: 10px;
    margin-right: 10px;
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
.actionInner{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
</style>