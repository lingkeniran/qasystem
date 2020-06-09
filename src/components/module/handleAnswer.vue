<template>
    <div>
        <el-dropdown class="ellipsis-dropdown">
            <span class="ellipsis">
                <img src="../../assets/shenglvehao.png" width="20px">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <div @click="modify()">编辑问题</div>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div @click="deleteQues()">删除问题</div>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div @click="terminal()">终结问题</div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    prop:['q_id']
}
</script>

<style lang="less" scoped>

</style>