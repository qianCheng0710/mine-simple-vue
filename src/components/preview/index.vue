<template>
  <div class="dialog-wrap">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="100%"
      :before-close="handleClose">
      <iframe :src="src" frameborder="0" class="full-width full-height" ></iframe>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    metaInfo: {
      meta: [
        { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes' }
      ]
    },
    props: {
      title: {
        type: String,
        default: '文件预览'
      },
      isShow: {
        type: Boolean,
        default: false
      },
      source: {},
      fileName: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'application/pdf'
      }
    },
    data() {
      return {
        dialogVisible: this.isShow,
        numPages: [],
        src: '',
        refreshPdf: true
      };
    },
    mounted() {

    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
        this.$emit('closeDialogFather',this.dialogVisible);
      }
    },
    watch: {
      isShow(val) {
        this.dialogVisible = this.isShow;
        if(val === false) {
          this.src = '';
        }
      },
      source(val) {
        this.src = "http://ow365.cn/?i=19628&furl=" + val;
      }
    },
  };
</script>


<style lang="scss" scoped>
.dialog-wrap {
  /deep/ {
    .el-dialog {
      width: 100%;
      height: 100%;
      margin: 0 !important;
    }
    .el-dialog__body {
      padding: 0 !important;
      height: calc(100% - 54px);
    }
  }
}
</style>

