<template>
  <div class="atlasTypes">
    <div class="d-flex height-45 px-3 title">
      <i class="iconfont iconfanhui text-20" @click="returnLast"></i>
      <div class="flex-full ml-3">
        <cube-tab-bar v-model="selectedLabel" show-slider @change="changeHandler">
          <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
          </cube-tab>
        </cube-tab-bar>
      </div>
      <i class="iconfont icontianjia text-20" @click="addAtlas" style="color: #1E7FFF"></i>
    </div>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label">
      </cube-tab-panel>
    </cube-tab-panels>
    <div class="of-auto" style="height: calc(100vh - 45px)">
      <keep-alive>
        <component :is="activeTab" :token="token" @imagePreview="imagePreview"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import workRecordAtlas from './components/workRecordAtlas'
  import projectQualityAtlas from './components/projectQualityAtlas'
  import projectSafeAtlas from './components/projectSafeAtlas'
  import Cookie from 'js-cookie';
  export default {
    components: {
      workRecordAtlas,
      projectQualityAtlas,
      projectSafeAtlas
    },
    data() {
      return {
        activeName: 'second',
        WorkRecordList: [],
        ProjectQualityList: [],
        ProjectSafeList: [],
        selectedLabel: '施工记录',
        activeTab: 'workRecordAtlas',
        token: localStorage.getItem('access_token'),
        tabs: [{
          label: '施工记录'
        }, {
          label: '工程质量'
        }, {
          label: '工程安全'
        }],
      }
    },
    methods: {
      changeHandler(label) {
        switch (label) {
          case '施工记录':
            this.activeTab = 'workRecordAtlas';
            break;
          case '工程质量':
            this.activeTab = 'projectQualityAtlas';
            break;
          case '工程安全':
            this.activeTab = 'projectSafeAtlas';
            break;
        }
      },
      imagePreview(address) {
        let arr = [];
        arr.push(address);
        this.$createImagePreview({
          imgs: arr
        }).show()
      },
      addAtlas() {
        this.$router.push("/addAtlas")
      },
      returnLast() {
        this.$router.go(-1)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .atlasTypes {
    .title {
      line-height: 45px;
      border-bottom: 1px solid #EEEEEE;
    }
    /deep/ {
      .cube-tab {
        padding: 0 !important;
      }
      .cube-tab div {
        color: #585858;
        font-size: 16px;
      }
      .cube-tab_active div{
        color: #007DFF !important;
      }
      .cube-tab-bar-slider {
        background-color: #007DFF;
      }
      .cube-btn {
        padding: 0;
        border-radius: 0;
        line-height: 0;
      }
    }
  }
</style>
