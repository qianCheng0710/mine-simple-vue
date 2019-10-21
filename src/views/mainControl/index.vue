<template>
  <div class="mainControl full-width px-6 pt-8">
    <div class="height-40 d-flex" style="line-height: 40px">
      <div class="width-40 height-40 headImg bg-white">
        <!--<img src="" alt="">-->
      </div>
      <p style="color: white" class="ml-2 text-20">{{username}}，欢迎您</p>
    </div>
    <el-row :gutter="20" class="full-width mt-5" v-for="(item, index) in list" :key="index">
      <el-col :span="12" v-for="(subItem, subIndex) in item" :key="subIndex + subItem.name">
        <div class="module full-width height-160 d-flex" @click="linkTo(subItem.routerName)">
          <div class="height-80 width-80 d-flex" :style="subItem.bgStyle" style="border-radius: 50%;justify-content: center;align-items: center">
            <i class="iconfont text-42" :class="subItem.icnoClass" :style="subItem.style"></i>
          </div>
          <p class="text-16">{{subItem.name}}</p>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '黄南水库项目部',
        list: [[
          {
            name: '视频监控',
            routerName: 'videoMonitor',
            style: 'color: #1E7FFF',
            bgStyle:  'background-color: #E9F4FF',
            icnoClass:   'iconshipinjiankong',
          }, {
            name: '现场监测',
            routerName: 'fieldTest',
            style: 'color: #F48383',
            bgStyle:  'background-color: #FBF3F3',
            icnoClass:   'iconxianchang',
        }], [
          {
            name: '碾压质量',
            routerName: 'rollOverQuality',
            style: 'color: #FDBE69',
            bgStyle:  'background-color: #FFF5E9',
            icnoClass:   'iconzhiliang',
          }, {
            name: '工程图集',
            routerName: 'atlasTypes',
            style: 'color: #34DAEA',
            bgStyle:  'background-color: #EAF9FC',
            icnoClass:   'icontuji',
          }
        ]],
      }
    },
    methods: {
      linkTo(param) {
        this.$router.push("/" + param);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .mainControl {
    height: 100vh;
    background: url('../../../public/img/jianbian.png') no-repeat;
    background-size: contain;
    .headImg {
      border-radius: 50%;
    }
    .module {
      background: #FFFFFF;
      box-shadow: 0 0 10px 0 rgba(153,153,153,0.20);
      border-radius: 4px;
      justify-content: center;
      align-items: center;
      flex-direction:column;
      padding: 15px 0;
    }
    .module p {
      margin-top: 15px;
    }
    /deep/ {
      .el-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  }
</style>
