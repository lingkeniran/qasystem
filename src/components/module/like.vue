<template>
    <div>
        <el-button type="text"  @click="like()" >
            <!-- 1：未点赞状态 -->
            <div class="actionInner" @change="like()" v-if="isLike===1">
                <span>
                    <img src="../../assets/zan.png" width="20px">
                </span >
                <div class="text">
                    赞同
                </div>
            </div>
            <!-- 0：已点赞状态 -->
            <div class="actionInner" @change="like()" v-else>
                <span >
                    <img src="../../assets/zan1.png" width="20px">
                </span>
                <div class="text">
                    取消赞同
                </div>
            </div>
        </el-button>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    name:'like',
    props:['q_id','isLike'],
    data(){
        return{
            q_id:this.q_id ,
            isLike:this.isLike
        }
    },
    methods:{
        like(){
            console.log('点赞的回答id',this.q_id,'初始点赞状态',this.isLike)
            let _this=this
            if(this.isLike==0){
                // this.isLike=1
                // console.log('变化后的isLike',this.isLike)
                let data = {
                    action: this.isLike,
                    q_id: this.q_id,
                    token: window.sessionStorage.getItem('token')
                }
                this.$axios({
                    method: "post",
                    url: 'user/agree',
                    data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log('是否点赞成功',res)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                        
                    }else if(res.data.resultCode==20019){
                        _this.$message({
                            type: 'warning',
                            message: '点赞失败!'
                        });
                    }
                    _this.isLike=1
                })
                .catch(function(err) {
                    console.log(err);
                })
            }else if(this.isLike==1){
                // this.isLike=0
                // console.log('变化后的isLike',this.isLike)
                let data = {
                    action: this.isLike,
                    q_id: this.q_id,
                    token: window.sessionStorage.getItem('token')
                }
                this.$axios({
                    method: "post",
                    url: 'user/agree',
                    data: Qs.stringify(data)
                })
                .then(function(res) {
                    console.log('是否点赞成功',res)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        _this.$message({
                            type: 'warning',
                            message: '登录失效，请重新登录!'
                        });
                    }
                    _this.isLike=0
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