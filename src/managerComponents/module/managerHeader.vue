<template>
    <div class="el-header-container">
        <div class="el-header">
            <div class="logo">
                <router-link to="/manager/index"><img src="../../assets/logo.png" alt="Q&A" width="100%"></router-link>
            </div>
            <el-dropdown>
                <span>
                    <img class="img_portrait" src="../../assets/portrait.jpg" alt="头像">
                    <!-- <img src="../../assets/01.jpg" width="36px" height="36px" style="border-radius:25px"> -->
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <div class="dropdownItem" @click="gotoSetting()">
                            <img class="littleIcon" src="../../assets/shezhi.png">
                            设置
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <div class="dropdownItem" @click="logout()">
                            <img class="littleIcon" src="../../assets/tuichu.png">
                            退出
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    name:'header',
    data(){
        return{}
    },
    methods:{
        gotoSetting(){
            let _this=this
            _this.$router.push('/manager_setting')
        },
        logout(){
            window.sessionStorage.clear()
            let _this=this
            _this.$router.push('/manager_login')
        },
    }
}
</script>

<style lang="less" scoped>
.el-header-container{
    width: 100%;
}
.el-header{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 60px;
}
.logo{
    width: 130px;
    margin-right: 20px;
    display: flex;
    align-items: center;
}
.el-menu-item{
    font-weight: bold;
    font-size: 18px;
    // margin-left: 10px;
    // margin-right: 10px;
}
.dropdownItem{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.littleIcon{
    height: 20px;
    width: 20px;
    margin-right: 5px;
}
.askQues-container{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.el-input{
    // margin-left: 50px;
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.el-menu.el-menu--horizontal{
     border-bottom:white;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.line{
    border-bottom:solid 1px #e6e6e6;
}
.el-button{
    margin-right: 120px;
}
.img_message{
    height:30px;
    /* // margin-right: 20px; */
}
.img_portrait{
    height:40px;
    margin-right: 20px;
}
.configBtn{
    margin-right: 30px;;
}
.askBtn{
    margin-right: 60px;
}
.text{
    font-size: 16px;
    margin-right: 10px;
    color: #229ad1;
}
</style>