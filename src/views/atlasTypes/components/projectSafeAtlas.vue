<template>
  <div class="projectSafeAtlas" v-loading="swithTabLoading">
    <div class="scroll-list-wrap" style="height: calc(100vh - 45px)">
      <cube-scroll
        ref="scroll"
        :data="[]"
        :options="options"
        @pulling-up="onPullingUp">
        <div v-for="(item, index) in filterList" :key="index">
          <div class="height-32 text-left" style="background-color: #F6F6F6;line-height: 32px">
            <p class="text-14 ml-4" style="color: #999999">{{item.year}}</p>
          </div>
          <div class="d-flex mx-4 my-4" v-for="(subItem, subIndex) in item.list" :key="subItem.day+subIndex+subItem.month">
            <p class="text-30">{{subItem.day}} <span class="text-14">{{subItem.month}}</span></p>
            <div class="d-flex height-140 ml-1 flex-full">
              <div class="flex-full" style="background-size: 100% 100%;">
                <cube-button @click="imagePreview(subItem.previewUrl)">
                  <img :src="subItem.url" alt="" class="full-width" v-show="subItem.url !== ''">
                </cube-button>
              </div>
              <div style="color: #333333;flex-shrink:1" class="ml-2 text-14 text-left width-110">{{subItem.title}}</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="position-absolute" style="z-index: 10;bottom: 15px;right: 15px;opacity: 0.4">
      <el-button @click="scrollTo()" type="primary" size="mini">
        <i class="el-icon-top">回到顶部</i>
      </el-button>
    </div>
  </div>
</template>

<script>
  import { getAtlas, getfileInfo } from '~api/index'
  export default {
    name: "projectSafeAtlas",
    props: ['token'],
    data() {
      return {
        swithTabLoading: false,
        infoList: [],
        constInfoList: [],
        size: 10000,
        pageSize: 5,
        page: 1,
        total: 0,
        scrollbar: true,
        startY: 0,
        scrollToY: 0,
        scrollToTime: 700,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载中...',
        pullUpLoadNoMoreTxt: '没有更多数据了...',
        index: 0,
        imgFinish: 0
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      //滑动设置
      options() {
        return {
          startY: this.startY,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: true
        }
      },
      //下拉刷新
      pullUpLoadObj() {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        } : false
      },
      filterList() {
        let countLen = 0;
        let result = [];
        this.infoList.forEach((item, yIndex) => {
          let list = item.list.filter(({name}, lIndex) => {
            return countLen + lIndex < this.pageSize * this.page;
          })
          if (countLen < this.pageSize * this.page) {
            result.push({
              list,
              year: item.year
            })
          }
          countLen += item.list.length;
        })
        return result;
      }
    },
    methods: {
      scrollTo() {
        this.$refs.scroll.scrollTo(
          0,
          this.scrollToY,
          this.scrollToTime
        )
      },
      init() {
        let obj = {
          access_token: this.token,
          sort: 'createTime,DESC',
          type: 101003,
          size: this.size
        };
        this.swithTabLoading = true;
        getAtlas(obj).then(res => {
          this.collationData(res);
        })
      },
      //整理获取的数据渲染页面
      async collationData(param) {
        let infoList = [];
        let infoListIndex = 0;
        param.map((item, index) => {
          if (infoList[infoListIndex] === undefined) {
            infoList.push({
              list: []
            });
          }
          item.month = item.createTime.slice(5, 7) + '月';
          item.day = item.createTime.slice(8, 10);
          item.url = ''
          item.previewUrl = item.files.length <=0?'':"http://www.huangn.cn/api/fileInfoes/getFile/" + item.files[0].filePreviewAddress + "?access_token=" + this.token;
          item.index = this.index;
          if (index === 0 || (item.createTime.slice(0, 4) === param[index - 1].createTime.slice(0, 4))) {
            infoList[infoListIndex].year = item.createTime.slice(0, 4) + '年';
            infoList[infoListIndex].list.push(item);
            this.index += 1;
          } else {
            infoListIndex += 1;
          }
        });
        this.infoList = infoList;
        this.infoList.forEach(item => {
          item.list.forEach(() => {
            this.total += 1;
          })
        });
      },
      async getImg(item) {
        return new Promise((resolve) => {
          setTimeout(() => {
            getfileInfo(this.$val(item.files, '0.fileThumbAddress', '')).then(res => {
              console.log(2);
              resolve(res);
              this.imgFinish +=1;
            }).catch(() => {
              this.imgFinish +=1;
            });
          }, 400)
        })
      },
      onPullingUp() {
        this.swithTabLoading = true;
        if (this.page * this.pageSize >= this.total){
          this.$refs.scroll.forceUpdate();
        }
        this.page ++;
      },
      imagePreview(address) {
        this.$emit('imagePreview', address);
      },
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
      },
      imgFinish(val) {
        if(val === 5) {
          this.imgFinish = 0;
          this.swithTabLoading = false;
        }
      },
      filterList: {
        handler(val) {
          let count = this.pageSize;
          for (let i = val.length - 1; i >= 0; i--) {
            if (count === 0) break;
            let list = val[i].list;
            for (let j = list.length - 1; j>= 0; j--) {
              if (count === 0) break;
              this.getImg(list[j]).then((res) => {
                list[j].url = res;
              });
              count -= 1;
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .projectSafeAtlas {

  }
</style>
