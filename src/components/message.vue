<template>
    <el-container>
        <!--头部目录区-->
        <my-header></my-header>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-view"
                    class="handle-del mr10"
                    @click="readAllSelection"
                >批量已读</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <!-- <el-select v-model="value" placeholder="全部" class="handle-select mr10">
                     <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option> -->
                    <!-- <el-option key="2" label="全部" value="2" @click="getMessageList()"></el-option>
                    <el-option key="0" label="未读" value="0"><div @click="getNOTReadMessageList()"></div></el-option>
                    <el-option key="1" label="已读" value="1" @click="getReadedMessageList()"></el-option>
                </el-select>  -->
                <el-dropdown>
                    <el-button class="viewMessage" type="primary">
                        分类查看消息<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><div @click="getMessageList()">全部消息</div></el-dropdown-item>
                        <el-dropdown-item><div @click="getNOTReadMessageList()">未读消息</div></el-dropdown-item>
                        <el-dropdown-item><div @click="getReadedMessageList()">已读消息</div></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>

                <el-table-column prop="um_content" label="消息内容"></el-table-column>
                <el-table-column  label="状态" width="70" align="center">
                    <slot slot-scope="scope">
                        <el-tag v-if="scope.row.um_isread===1">已读</el-tag>
                        <el-tag type="danger" v-else>未读</el-tag>
                    </slot>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.um_isread===0"
                            type="text"
                            icon="el-icon-view"
                            @click="handleRead(scope.$index, scope.row)"
                        >已读</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-size="10"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </el-container>
</template>

<script>
import myHeader from '../components/module/header.vue'
import Qs from 'qs'
export default {
    components: {
        myHeader,
    },
    data(){
        return{
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            readList:[],
            editVisible: false,
            pageTotal: '',
            form: {},
            idx: -1,
            id: -1,
            um_isread:'',
            options: [{
                value: '1',
                label: '全部'
            }, {
                value: '2',
                label: '已读'
            }, {
                value: '3',
                label: '未读'
            }],
            value:''
        }
    },
    created() {
        this.getMessageList();
    },
    methods:{
        getReadedMessageList(){
            let data = {
                token: window.sessionStorage.getItem('token'),
                number:10,
                page:1
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getMessageListRead',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("已读消息列表",res);
                _this.tableData=res.data.data.list
                // console.log(_this.tableData)
                _this.pageTotal=res.data.data.totalRow
                if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
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
        getNOTReadMessageList(){
            let data = {
                token: window.sessionStorage.getItem('token'),
                number:10,
                page:1
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getMessageListNOTRead',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                // console.log("未读消息列表",res);
                _this.tableData=res.data.data.list
                // console.log(_this.tableData)
                _this.pageTotal=res.data.data.totalRow
                if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
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
        getMessageList(){
            let data = {
                token: window.sessionStorage.getItem('token'),
                number:10,
                page:1
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getMessageList',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("消息列表",res);
                _this.tableData=res.data.data.list
                console.log(_this.tableData)
                _this.pageTotal=res.data.data.totalRow
                if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
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
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.idx = index;
                    this.form = row;
                    console.log('单条删除',index,row)
                    let data = {
                        token: window.sessionStorage.getItem('token'),
                        um_id:row.um_id
                    }
                    let _this=this
                    console.log(data)
                    this.$axios({
                        method: "post",
                        url: 'user/cancelMessage',
                        data: Qs.stringify(data)
                    })
                    .then(function(res) {
                        console.log("删除单条消息",res);
                        if(res.data.resultCode==20016){
                            location.reload()
                        }
                        else if(res.data.resultCode==20031){
                            this.$message.error('删除消息失败，请稍后再试')
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    const length = this.multipleSelection.length;
                    console.log(length)
                    let ids = '';
                    // this.readList = this.readList.concat(this.multipleSelection);
                    this.delList=this.multipleSelection
                    console.log('删除列表',this.delList)
                    // var ids=[]
                    for (let i = 0; i < length; i++) {
                        // ids.push( this.readList[i].um_id)
                        ids += this.delList[i].um_id + ',';
                    }
                    console.log(ids)
                    let data = {
                        token: window.sessionStorage.getItem('token'),
                        um_id:ids
                    }
                    let _this=this
                    console.log(data)
                    this.$axios({
                        method: "post",
                        url: 'user/cancelMessage',
                        data: Qs.stringify(data)
                    })
                    .then(function(res) {
                        console.log("删除消息",res);
                        if(res.data.resultCode==20016){
                            location.reload()
                        }
                        else if(res.data.resultCode==20031){
                            _this.$message.error('删除消息失败，请稍后再试')
                        }
                        _this.multipleSelection = [];
                        _this.delList=[]
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                })
                .catch(() => {});
        },
        readAllSelection() {
            const length = this.multipleSelection.length;
            let ids = '';
            // this.readList = this.readList.concat(this.multipleSelection);
            this.readList=this.multipleSelection
            console.log('已读列表',this.readList)
            // var ids=[]
            for (let i = 0; i < length; i++) {
                // ids.push( this.readList[i].um_id)
                ids += this.readList[i].um_id + ',';
            }
            console.log(ids)
            let data = {
                token: window.sessionStorage.getItem('token'),
                um_id:ids
            }
            let _this=this
            console.log(data)
            this.$axios({
                method: "post",
                url: 'user/readMessage',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("阅读消息",res);
                if(res.data.resultCode==20029){
                    location.reload()
                }
                else if(res.data.resultCode==20030){
                    _this.$message.error('阅读消息失败，请稍后再试')
                }
                _this.multipleSelection = [];
                _this.readList=[]
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        // 编辑操作
        handleRead(index, row) {
            this.idx = index;
            this.form = row;
            console.log('单条已读',index,row)
            let data = {
                token: window.sessionStorage.getItem('token'),
                um_id:row.um_id
            }
            let _this=this
            console.log(data)
            this.$axios({
                method: "post",
                url: 'user/readMessage',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("阅读消息",res);
                if(res.data.resultCode==20029){
                    location.reload()
                }
                else if(res.data.resultCode==20030){
                    this.$message.error('阅读消息失败，请稍后再试')
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        // 分页导航
        handlePageChange(e) {
            console.log('第几页',e)
            let data = {
                token: window.sessionStorage.getItem('token'),
                number:10,
                page:e
            }
            let _this=this
            this.$axios({
                method: "post",
                url: 'user/getMessageList',
                data: Qs.stringify(data)
            })
            .then(function(res) {
                console.log("消息列表",res);
                _this.tableData=res.data.data.list
                _this.pageTotal=res.data.data.totalRow
                if(res.data.resultCode==1002||res.data.resultCode==1003||res.data.resultCode==1004){
                    _this.$message({
                        message: '登录失效，请重新登录',
                        type: 'warning'
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-container{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
    margin-left: 10px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 5px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.el-dropdown-link {
cursor: pointer;
color: #409EFF;
}
.el-icon-arrow-down {
font-size: 12px;
}
.viewMessage{
    margin-left: 10px;
}
</style>