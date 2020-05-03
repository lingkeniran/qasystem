<template>
    <div class="paging">
        <el-pagination
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10" 
            layout="prev, pager, next, jumper"
            :total="1000">
        </el-pagination>
    </div>
</template>

<script>
export default {
    methods:{
        handleCurrentChange(e){
            console.log(e)
        },
    }
}
</script>

<style lang="less" scoped>

</style>