<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <!-- 主体区 -->
        <el-main>
            <div class="main-container"> 
                <!--轮播广告图-->
                <div class="block">
                    <el-carousel height="120px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small"></h3>
                        </el-carousel-item>
                    </el-carousel>
                    <!-- <my-swiper></my-swiper> -->
                </div>
                <div class="questionContainer"> 
                    <div class="questionContent">
                        <div class="questionList">
                            <div class="questionItem" v-for="item in quesList" :key="item.q_id" index='item.q_id'>
                                <div class="questionItem-answerItem">
                                    <div class="richContentTop"  @click="getQuestionDetail(item.q_id)">
                                        <div class="isQuesEnd" v-if="item.q_finished===1">
                                            <div class="actionInner">
                                                <span>
                                                    <img src="../assets/jinzhi.png" width="20px">
                                                </span>
                                                <span class="text">
                                                    问题已终结
                                                </span>
                                            </div>
                                        </div>
                                        <div class="richContentTitle">
                                            {{item.q_title}}
                                        </div>
                                    </div>
                                    <div class="richContent"  @click="getQuestionDetail(item.q_id)">
                                        <div class="richContentInner">
                                            <div v-html="item.u_icon" class="uIcon">{{item.u_icon}}</div>
                                            <div>{{item.u_name}}：</div>
                                            <div  v-html="item.q_content">{{item.q_content}}</div>
                                        </div>
                                    </div>
                                    <div class="richContentBottom">
                                        <div class="richContentAction">
                                            <el-button type="text">
                                                <div class="actionInner">
                                                    <span>
                                                        <img src="../assets/answer.png" width="20px">
                                                    </span>
                                                    <span class="text">
                                                        {{item.replynumber}}条回答
                                                    </span>
                                                </div>
                                            </el-button>
                                            <report v-if="item.isReported===0&&u_id!=item.u_id" :qId="item.q_id"></report>
                                        </div>
                                        <div class="latestReplyTime">
                                            更新时间：{{item.latestReplyTime}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="paging">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage3"
                                :page-size="10" 
                                :hide-on-single-page=true
                                layout="prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </div>
                    
                    <div class="hotList">
                        <div class="hotListTitle">
                            热榜
                        </div>
                        <div class="hotListStyle">
                            <!-- <div v-for="n in number" :key="n" class="number">
                                {{n}}
                            </div>
                            <div class="hotListContent" v-for="i in hotQuesList" :key="i.q_id" >
                                {{i.q_title}}
                            </div> -->
                            <table class="c-table opr-toplist1-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-index-hot1 c-gap-icon-right-small">1</span>
                                                <a class="hotListContent" href="">{{hotList[0].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[0].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-index-hot2 c-gap-icon-right-small">2</span>
                                                <a class="hotListContent" href="">{{hotList[1].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[1].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-index-hot3 c-gap-icon-right-small">3</span>
                                                <a class="hotListContent" href="">{{hotList[2].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[2].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-gap-icon-right-small">4</span>
                                                <a class="hotListContent" href="">{{hotList[3].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[3].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-gap-icon-right-small">5</span>
                                                <a class="hotListContent" href="">{{hotList[4].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[4].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-gap-icon-right-small">6</span>
                                                <a class="hotListContent" href="">{{hotList[5].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[5].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-gap-icon-right-small">7</span>
                                                <a class="hotListContent" href="">{{hotList[6].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[6].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-gap-icon-right-small">8</span>
                                                <a class="hotListContent" href="">{{hotList[7].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[7].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-gap-icon-right-small">9</span>
                                                <a class="hotListContent" href="">{{hotList[8].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[8].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                    <tr>
                                        <td>
                                            <span>
                                                <span class="c-index c-index-hot10 c-gap-icon-right-small">10</span>
                                                <a class="hotListContent" href="">{{hotList[9].q_title}}</a>
                                            </span>
                                        </td>
                                        <td class="opr-toplist1-right opr-toplist1-right-hot">
                                            {{hotList[9].replynumber}}讨论
                                        </td>
                                    </tr>
                                    <div class="line"></div>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
            <el-backtop></el-backtop>
        </el-main>
    </el-container>
</template>

<script>
import myHeader from '../components/module/header.vue'
import report from './module/report.vue'
// import mySwiper from './module/swiper.vue'
// import imageSlider from './module/ImageSlider.vue'
import Qs from 'qs'
export default {
    components: {
        myHeader,
        report,
        // mySwiper,
        // imageSlider
    },
    data() {
        return {
            // number:[1,2,3,4,5,6,7,8,9,10],
            isEnd:'',
            isReport:'',
            total:'',
            // listPage:{
            //     page : "1",
            //     number : "10",
            //     token:""
            // },
            //获取全部问题列表数据
            quesList:[],
            // hotQuesList:[],
            hotList:[],
            input: '',
            centerDialogVisible: false,
            textarea: '',
            u_id:window.sessionStorage.getItem('u_id'),
        }
    },
    created(){
        this.getquestionList()
        this.getHotQuestionList()
    },
    methods:{
        getquestionList(){
            let data = {
                page: 1,
                number: 10,
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getQuestionList',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("问题列表",res);
                // console.log(res.data.resultCode)
                if(res.data.resultCode==20006){
                // if(res.data.list.q_protected==0&&res.data.list.u_reported==0){
                    _this.quesList=res.data.data.list
                    _this.total=res.data.data.totalRow
                    // console.log(_this.quesList)
                    if(res.data.data.list.q_finished==1){
                        _this.isEnd=true
                    }else{
                        _this.isEnd=false
                    }
                    if(res.data.data.list.isReported==1){
                        _this.isReport=false
                    }else{
                        _this.isReport=true
                    }
                // }
                }else{
                    console.log(res.resultCode)
                    if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                        alert('登录过期,请重新登录')
                    }else if(res.data.resultCode==20007){
                        alert('加载失败，请稍后再试')
                    }
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        async getHotQuestionList(){
            const {data:res} =await this.$axios.get('user/getHotQuestionList')
            if(res.resultCode==20006){
                this.hotList=res.data
            }
            console.log('热榜',this.hotList)
        },
        handleCurrentChange(e){
            console.log(e)
            // this.listPage.page=e
            let data = {
                page: e,
                number: 10,
                token: window.sessionStorage.getItem('token')
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getQuestionList',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log(res);
                console.log(res.data.resultCode)
                if(res.data.resultCode==20006){
                // if(res.data.list.q_protected==0&&res.data.list.u_reported==0){
                    _this.quesList=res.data.data.list
                    console.log(_this.quesList)
                    if(_this.quesList[0].q_finished==1){
                        _this.isEnd=true
                    }else{
                        _this.isEnd=false
                    }
                    if(_this.quesList[0].isReported==1){
                        _this.isReport=false
                    }else{
                        _this.isReport=true
                    }
                // }
                }else{
                    console.log(res.resultCode)
                    alert('加载失败，请稍后再试')
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        getQuestionDetail(e){
            console.log(e)
            var q_id=e
            let _this=this
            _this.$router.push({
                path:'/detail',
                name:'detail',
                //参数
                query:{
                    q_id:q_id,
                    // dataObj:{}
                }
            })
        },
        closeDialog(){
            this.textarea="";
        },
        report(q_id){
            let _this=this
            console.log('举报问题id',q_id)
            console.log('举报内容',_this.textarea)
            console.log('举报token',window.sessionStorage.getItem('token'))
            let data = {
                q_id: q_id,
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
.el-container{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
.main-container{
    width: 1060px;
    height: 100%;
    /* display: flex; */
    /* align-items: flex-start; */
    margin: 0 auto;
}
.block{
    margin-bottom: 10px;
    // height: 300px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
.el-carousel__item:nth-child(4n) {
    background-image: url('./../assets/1.jpg');
    background-repeat: no-repeat;
    background-size: 100% 120px; 
}
.el-carousel__item:nth-child(4n+1) {
    background-image: url('./../assets/2.jpg');
    background-repeat: no-repeat;
    background-size: 100% 120px; 
}
.el-carousel__item:nth-child(4n+2) {
    background-image: url('./../assets/3.jpeg');
    background-repeat: no-repeat;
    background-size: 100% 120px; 
}
.el-carousel__item:nth-child(4n+3) {
    background-image: url('./../assets/4.jpg');
    background-repeat: no-repeat;
    background-size: 100% 120px; 
}
// .richContentTop{
//     display: flex;
//     flex-wrap: wrap;
// }
.isQuesEnd{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
}
.richContent{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
}
.richContentTitle{
    width: 100%;
    margin-left: 15px;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.8;
}
.richContentInner{
    padding-left: 15px;
    display: flex;
    flex-wrap: nowrap;
    font-size: 16px;
    line-height: 1.6;
}
.uIcon{
    margin-right: 10px;
}
.richContentBottom{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-left: 3px;
}
.richContentAction{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    // align-items: baseline;
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
.questionList{
    width: 750px;
    margin-right: 10px;
}
.questionItem{
    padding: 10px;
    padding-bottom: 2px;
    border: solid 0.5px #e6e6e6;
}
.questionContainer{
    display: flex;
    flex-wrap: nowrap;
}
.qTime{
    width: 100%;
    font-size: 12px;
    color: grey;
    margin-left: 15px;
    margin-bottom: 10px;
}
.latestReplyTime{
    margin-top: 5px;
    // line-height: 1.6;
    font-size: 12px;
    color: grey;
    margin-left: 15px;
}
.hotList{
    width: 300px;
    padding: 10px;
    height: 500px;
    border: solid 0.5px #e6e6e6;
}
.paging{
    margin: 10px auto;
}
.el-pagination{
    display: flex;
    justify-content: center;
}
.askBtn{
    height: 40px;
    margin-top: 0px;
    width: 60px;
}
.hotListTitle{
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-top: 5px;
}
.hotListStyle{
    display: flex;
    flex-wrap: nowrap;
}
.hotListContent{
    font-size: 16px;
    line-height: 1.6;
    margin-left: 10px;
    white-space:nowrap; //规定段落中的文本不进行换行
    text-overflow:ellipsis; //text-overflow 属性规定当文本溢出包含元素时发生的事情。ellipsis:显示省略符号来代表被修剪的文本。
    overflow:hidden;
    vertical-align:middle;
    display: inline-block;
    width: 160px;
    overflow: hidden;
}
.c-table{
    width: 280px;
}
.c-index{
    display: inline;
    padding: 1px 5px;
    color: #fff;
    line-height: 1.6;
    font-size: 16px;
    text-align: center;
    background-color: #8eb9f5;
}
.c-index-hot, .c-index-hot1{
    background-color: #f54545;
}
.c-index-hot2{
    background-color: #ff8547;
}
.c-index-hot3{
    background-color: #ffac38;
}
.c-index-hot10{
    padding: 1px 1.5px;
}
.c-gap-icon-right-small{
    margin-right: 5px;
}
// .line{
//     width: 100%;
//     border-bottom:solid 1px #e6e6e6;
// }
.c-table th, .c-table td{
    padding-left: 10px;
    line-height: 1.6;
    font-size: 16px;
    border-bottom: 1px solid #f3f3f3;
    text-align: left;
}
.c-table td{
    padding-top: 6.5px;
    padding-bottom: 6.5px;
}
.c-table th, .c-table td{
    padding-left: 10px;
    line-height: 1.6;
    font-size: 16px;
    border-bottom: 1px solid #e6e6e6;
}
.opr-toplist1-table .opr-toplist1-right{
    text-align: right;
    white-space: nowrap;
}
</style>