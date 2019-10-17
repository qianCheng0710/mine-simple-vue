<template>
  <div class="rollOverQuality">
    <div class="height-45 px-3 title">
      <i class="iconfont iconfanhui text-20 fl" @click="returnLast"></i>
      <span class="text-18 font-weight-bold">碾压质量</span>
    </div>
    <div class="mt-3 d-flex" style="justify-content: center">
      <div style="line-height: 36px;width: 90%">
        <el-input
          placeholder="请输入关键字"
          @change="selectInfo"
          v-model="fileName">
          <i slot="prefix" class="iconfont iconsousuocu text-16 mr-1" style="color: #DDDDDD"></i>
        </el-input>
      </div>
    </div>
    <div style="height:calc(100vh - 96px)">
      <cube-scroll
        ref="scroll"
        :data="contentList"
        :options="options">
        <div class="mt-3 d-flex" style="justify-content: center;" v-for="(item, index) in contentList" :key="index">
          <div class="d-flex pb-2 list">
            <div class="text-left" style="flex: 1;">
              <p class="subTitle font-weight-bold">{{item.fileName}}</p>
              <p class="text-12 mt-1" style="color: #999999">{{item.fileCreateTime}}</p>
            </div>
            <i class="iconfont iconPDF text-22 ml-2" style="color: #F51818" @click="previewPdf(item)"></i>
          </div>
        </div>
      </cube-scroll>
    </div>
    <Preview :source="source" :isShow="isShow" @closeDialogFather="closeDialogFather"/>
  </div>
</template>

<script>
  import { getRollOverQuality, getfileInfo } from '~api/index'
  import Preview from '~components/preview';
  import Cookie from 'js-cookie';
  const token = localStorage.getItem('access_token');
  export default {
    name: 'rollOverQuality',
    components: {
      Preview
    },
    data() {
      return {
        fileName: '',
        fileList: [],
        page: 0,
        size: 10,
        contentList: [],
        scrollbar: true,
        scrollbarFade: true,
        startY: 0,
        source: '',
        isShow: false,
      }
    },
    computed: {
      options() {
        return {
          scrollbar: this.scrollbarObj,
          startY: this.startY
        }
      },
      scrollbarObj: function() {
        return this.scrollbar ? { fade: this.scrollbarFade } : false
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let param = {
          access_token: token,
          fileType: 3,
          fileName: this.fileName,
          page: this.page,
          size: this.size
        };
        getRollOverQuality(param).then(res => {
          this.contentList = res;
        });
      },
      selectInfo() {
        this.init();
      },
      previewPdf(item) {
        this.isShow = true;
        if(item.fileRelativeAddress !== ''){
          this.source = 'http://www.huangn.cn/api/fileInfoes/getFile/' + item.fileRelativeAddress + '?access_token=' + token
        }else {
          this.$message.error('文件缺失，预览失败');
        }
      },
      rebuildScroll() {
        Vue.nextTick(() => {
          this.$refs.scroll.destroy();
          this.$refs.scroll.initScroll()
        })
      },
      returnLast() {
        this.$router.go(-1)
      },
      closeDialogFather(boolean) {
        this.isShow = boolean;
        if(!boolean) {
          this.source = '';
        }
      }
    },
    watch: {
      scrollbarObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      startY() {
        this.rebuildScroll()
      }
    }
  };
</script>

<style lang="scss" scoped>
  .rollOverQuality {
    .title {
      justify-content: space-between;
      line-height: 45px;
      border-bottom: 1px solid #EEEEEE;
    }
    .list {
      line-height: 20px;
      width: 90%;
      border-bottom: 1px solid #EEEEEE;
      align-items: center;
      .subTitle {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 16px;
      }
    }
    /deep/ {
      .el-input__inner {
        border-radius: 20px;
      }
      .el-input__prefix {
        left: 15px;
      }
      .el-input--prefix .el-input__inner {
        padding-left: 40px;
        color: #cccccc;
        font-size: 14px;
        background-color: #F5F5F5;
        border: none;
        height: 36px;
      }
    }
  }
</style>
