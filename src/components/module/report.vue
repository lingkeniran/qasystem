<template>
    <div>
        <el-button type="text" @click="centerDialogVisible = true">
            <div class="actionInner">
                <span>
                    <img src="../../assets/jubao.png" width="20px">
                </span>
                <div class="text">
                    举报
                </div>
            </div>
        </el-button>
        <el-dialog
            title="举报"
            :visible.sync="centerDialogVisible"
            width="50%"
            center
            @close='closeDialog'
            :close-on-click-modal='false'>
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入举报理由"
                v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false;report()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    name:'report',
    inject: ['reload'], //注入
    props:['qId'],
    data:function(){
        return{
            centerDialogVisible:false,
            textarea: '',
            qId:this.qId
        }
    },
    methods:{
        closeDialog(){
            this.textarea="";
            this.reload()
        },
        report(){
            let _this=this
            console.log('举报问题id',this.qId)
            console.log('举报内容',_this.textarea)
            console.log('举报token',window.sessionStorage.getItem('token'))
            let data = {
                q_id: this.qId,
                qr_content: _this.textarea,
                token: window.sessionStorage.getItem('token')
            }
            var token=window.sessionStorage.getItem('token')
            if(token==null||token==undefined||token==""){
                alert('请先登录')
            }
            if(_this.textarea==""){
                alert('举报内容不能为空！')
            }
            if(token!=null||token!=undefined||token!="")
            {
                this.$axios({
                method: "post",
                url: 'user/report',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log(res);
                    console.log(res.data.resultCode)
                    if(res.data.resultCode==20013){
                        alert('举报成功!')
                    }
                    else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        alert('登录失效，请重新登录')
                    }else if(res.data.resultCode==20014){
                        alert('举报失败，请稍后再试')
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