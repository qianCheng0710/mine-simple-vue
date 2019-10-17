<template>
  <div class="videoMonitor">
    <div class="height-45 px-3 title">
      <i class="iconfont iconfanhui text-20 fl" @click="returnLast"></i>
      <span class="text-18 font-weight-bold">视频监控</span>
    </div>
    <div style="background-color: #f5f5f5;height: calc(100vh - 45px)">
      <el-select v-model="cameraUuid" placeholder="请选择监控点" class="full-width" @change="selectVideo">
        <el-option
          v-for="item in options"
          :key="item.cameraUuid"
          :label="item.cameraName"
          :value="item.cameraUuid">
        </el-option>
      </el-select>
      <div :class="videoVal===1?'selectVideo':''" style="background-color: #444444;z-index: 0;position: relative;height: calc((100% - 70px)/2)" @click="videoVal=1">
        <section id="wrapper" class="chimee-container full-height" @click="videoVal=1">
          <video tabindex="-1" class="full-height"  preload="auto" controls @click="videoVal=1"></video>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { getVideoResource } from '~api/index'

  import ChimeeMobilePlayer from 'chimee-mobile-player';
  import 'chimee-mobile-player/lib/chimee-mobile-player.browser.css'

  export default {
    data() {
      return {
        options: [],
        cameraUuid: '',
        videoVal: 1,
        selectVal: 2,
        selectName: '',
        loading: false,
        hls: null,
        video: null,
      }
    },
    mounted() {
      this.getResource();
      const plugin = {
        // 插件名为 controller
        name: 'controller',
        // 插件实体为按钮
        el: '<button>play</button>',
        data: {
          text: 'play'
        },
        methods: {
          changeVideoStatus () {
            this[this.text]();
          },
          changeButtonText (text) {
            this.text = text;
            this.$dom.innerText = this.text;
          }
        },
        // 在插件创建的阶段，我们为插件绑定事件。
        create () {
          this.$dom.addEventListener('click', this.changeVideoStatus);
        },
        // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
        events: {
          pause () {
            this.changeButtonText('play');
          },
          play () {
            this.changeButtonText('pause');
          }
        }
      };
    },
    beforeDestroy() {
      this.videoPause();
    },
    methods: {
      returnLast() {
        this.$router.go(-1)
      },
      // 获取播放流
      selectVideo(data) {
        console.log(ChimeeMobilePlayer);
        if (data === undefined || data === '') {
          return;
        }else {
          this.loading = true;
          // this.videoPause();
          this.getStream(data);
        }
        this.options.map(item => {
          if(item.cameraUuid === data) this.selectName = item.cameraName;
        });
      },
      getStream(data) {
        let videoId = '';
        if(this.videoVal === 1) {
          videoId = '#wrapper';
        }else {
          videoId = '#wrapper2';
        }
        new ChimeeMobilePlayer({
          wrapper: videoId,  // video dom容器
          src: `http://www.huangn.cn/mag/hls/${data}/1/live.m3u8`,
          isLive: true,
          autoplay: true,
          controls: true,
          playsInline: true,
          preload: 'auto',
          x5VideoPlayerFullscreen: true,
          x5VideoOrientation: 'landscape|portrait',
          xWebkitAirplay: true,
          muted: true,
          box: 'native',
          disableUA: ['Mozilla/5.0 (Linux; Android 4.4.2; HM NOTE 1TD Build/KOT49H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.97 Mobile Safari/537.36'],
        });
      },
      // 停止流
      videoPause() {
        if (this.hls !== undefined && this.hls !== null) {
          if (this.video) {
            this.video.pause();
          }
          this.hls.destroy();
          this.hls = null;
        }
      },
      getResource() {
        getVideoResource().then(res => {
          this.options = res;
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .videoMonitor {
    .title {
      line-height: 45px;
      border-bottom: 1px solid #EEEEEE;
    }
    .tabStyle {
      border-radius: 30px;
      line-height: 40px
    }
    .tabActive {
      background-color: #1E7FFF;
      color: white;
    }
    .selectVideo {
      border: 3px solid #ffb32d;
    }
    /deep/ {
      .el-select-dropdown {
        z-index: 9999 !important;
      }
      .el-input__inner {
        border: none;
        border-bottom: 1px solid #EEEEEE;
      }
      .el-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .el-row .el-col-12:nth-child(1) {
        padding-left: 0px !important;
      }
      .el-row .el-col-12:nth-child(2) {
        padding-right: 0px !important;
      }
    }
  }
</style>
