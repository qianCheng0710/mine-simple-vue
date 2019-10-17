<template>
  <div class="fieldTest">
    <div class="height-45 px-3 title">
      <i class="iconfont iconfanhui text-20 fl" @click="returnLast"></i>
      <span class="text-18 font-weight-bold">现场监测</span>
    </div>
    <div style="background-color: #F5F5F5;min-height: calc(100vh - 45px)" >
      <div class="bg-white of-hidden mb-2" v-for="(item, index) in infoList" :key="index">
        <div class="mt-3 mx-3">
          <div class="d-flex" style="justify-content: space-between">
            <div>
              <i class="iconfont iconhandong text-18" style="color: #1E7FFF"></i>
              <span class="font-weight-bold text-16 ml-2">{{index===0?'一号洞':index ===1?'二号洞':'输水隧洞进水口'}}</span>
            </div>
            <!--<div>-->
              <!--<div class="width-14 height-14 d-inline-block" style="border-radius: 50%;background-color: #63E345"></div>-->
              <!--<p class="d-inline-block ml-1">安全</p>-->
            <!--</div>-->
          </div>
        </div>
        <div class="text-left text-14 mb-4" style="color: #666666" >
          <el-row :gutter="30" class="mt-3">
            <el-col :span="12">
              可燃气体：{{item.combustibleGas?item.combustibleGas + 'ppm':'无'}}
            </el-col>
            <el-col :span="12">
              硫化氢：{{item.hydrogenSulfide?item.hydrogenSulfide + 'ppm':'无'}}
            </el-col>
          </el-row>
          <el-row :gutter="30" class="mt-3">
            <el-col :span="12">
              粉尘：{{item.oxygen?item.oxygen + 'μg':'无'}}
            </el-col>
            <el-col :span="12">
              一氧化碳：{{item.co?item.co + 'ppm':'无'}}
            </el-col>
          </el-row>
          <el-row :gutter="30" class="mt-3">
            <el-col :span="12">
              氧气含量：{{item.dust?item.dust + '%':'无'}}
            </el-col>
          </el-row>
        </div>
        <!--<div class="text-left ml-3 mt-3 mb-4">-->
          <!--<el-button class="height-34 text-14" type="primary" round>-->
            <!--<i class="iconfont iconshipinjiankongdefuben text-18" style="color: white"></i>-->
            <!--<span class="ml-1">视频监控</span>-->
          <!--</el-button>-->
          <!--<el-button class="height-34 text-14" type="primary" round>-->
            <!--<i class="iconfont iconlishishujudefuben text-18" style="color: white"></i>-->
            <!--<span class="ml-1" @click="showHistoryInfo(item)">历史数据</span>-->
          <!--</el-button>-->
        <!--</div>-->
      </div>
    </div>
    <historyInfo :isShow="isShow" @closeDialogFather="closeDialogFather" :showInfo="showInfo"></historyInfo>
  </div>
</template>

<script>
  import { getstatisticsData } from '~api/index';
  import historyInfo from './components/historyInfo'
  export default {
    components: {
      historyInfo
    },
    data() {
      return {
        activeName: 'second',
        infoList: [],
        showInfo: {},
        isShow: false
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        getstatisticsData().then(res => {
          this.infoList = res;
        });
      },
      returnLast() {
        this.$router.go(-1)
      },
      showHistoryInfo(param) {
        this.isShow = true;
        this.showInfo = param;
      },
      closeDialogFather(boolean) {
        this.isShow = boolean;
        if(!boolean) {
          this.source = '';
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .fieldTest {
    .title {
      line-height: 45px;
      border-bottom: 1px solid #EEEEEE;
    }
    .el-button.is-round {
      padding: 4px 18px;
      background-color: #1E7FFF;
    }
    /deep/ {
      .el-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  }
</style>
