<template>
  <div>
    <div class="container">
      <quill-editor
        class="quill-editor"
        ref="myTextEditor"
        v-model="content"
        :options="editorOption"
      ></quill-editor>
    </div>
    <div class="el-btn">
      <el-button class="editor-btn" type="primary" @click="submit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import Qs from 'qs'
export default {
  data(){
    return{
      content:'',
      editorOption: {
        placeholder: '请具体描述您的问题...',
      }
    }
  },
  components: {
    quillEditor
  },
}
</script>

<style lang="less" scoped>
.editor-btn{
    margin-top: 30px;
    margin-left: 610px;
}
.container{
    width: 680px;
    height: 250px;
}
.quill-editor{
    width: 650px;
    height: 200px;
}
.bigContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.el-btn{
    display: flex;
    justify-content: flex-end;
}
.el-input{
    width: 650px;
    margin-bottom: 10px;
}
</style>