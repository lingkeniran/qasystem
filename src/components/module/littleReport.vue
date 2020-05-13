<template>
    <div>
        <div @change="report()" v-if="isReport">
            <el-button type="text" class="little-el-button" @click="centerDialogVisible = true">
                <div class="actionInner">
                    <span>
                        <img src="../../assets/jubao.png" width="15px">
                    </span>
                    <div class="little-text">
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
                :close-on-click-modal='false'
                append-to-body>
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
        <div @change="report()" v-else></div>
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
            qId:this.qId,
            isReport:true
        }
    },
    methods:{
        closeDialog(){
            this.textarea="";
            // this.reload()
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
                _this.$message({
                    type: 'warning',
                    message: '请先登录!'
                });
            }
            if(_this.textarea==""){
                _this.$message({
                    type: 'warning',
                    message: '举报内容不能为空!'
                });
            }
            if(token!=null||token!=undefined||token!="")
            {
                _this.$axios({
                method: "post",
                url: 'user/report',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log(res);
                    console.log(res.data.resultCode)
                    if(res.data.resultCode==20013){
                        _this.$message({
                            type: 'success',
                            message: '举报成功!'
                        });
                        _this.isReport=false
                    }
                    else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                    }else if(res.data.resultCode==20014){
                        _this.$message({
                            type: 'warning',
                            message: '举报失败，请稍后再试!'
                        });
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
</style>