<template>
    <div>
        <el-popover
            placement="top"
            width="160"
            v-model="visible"
            :disabled="disable">
            <p>确认举报该用户？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false;dialogVisible = true;">确定</el-button>               
            </div>
            <img :src="imgsrc" class="uIcon"  slot="reference">
            <!-- <el-button slot="reference">删除</el-button> -->
        </el-popover>
        <el-dialog
            title="举报"
            :visible.sync="dialogVisible"
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;report()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    props:['imgsrc','u_id','userId'],
    data(){
        return{
            visible:false,
            disable:false,
            dialogVisible:false,
            textarea: '',
            // imgsrc:this.imgsrc,
            // u_id:this.u_id,
        }
    },
    created(){
        this.isProppor()
    },
    methods:{
        isLogin(){
            if(this.sessionStorage.getItem('token')==''){
                this.$message.error('请先登录')
                return
            }
        },
        isProppor(){
            var u_id=this.u_id
            var userId=Number(this.userId)
            console.log(u_id,userId)
            let _this=this
            if(u_id==userId){
                _this.disable=true
            }else if(u_id!=userId){
                _this.disable=false
            }
        },
        closeDialog(){
            this.textarea="";
        },
        report(){
            let _this=this
            let data = {
                u_report_id: this.u_id,
                ur_content: _this.textarea,
                token: window.sessionStorage.getItem('token')
            }
            var token=window.sessionStorage.getItem('token')
            if(token==null||token==undefined||token==""){
                _this.$message.error('请先登录')
            }
            if(_this.textarea==""){
                _this.$message.error('举报内容不能为空！')
            }
            if(token!=null||token!=undefined||token!="")
            {
                this.$axios({
                method: "post",
                url: 'user/reportuser',
                data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log(res);
                    // console.log(res.data.resultCode)
                    if(res.data.resultCode==20013){
                        _this.$message({
                            type: 'success',
                            message: '举报成功，等待管理员审核!'
                        })
                    }
                    else if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message.error('登录失效，请重新登录')
                    }else if(res.data.resultCode==20014){
                        _this.$message.error('举报失败，不能重复举报')
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
.uIcon{
    margin-right: 10px;
    height: 25px;
    width: 25px;
}
</style>