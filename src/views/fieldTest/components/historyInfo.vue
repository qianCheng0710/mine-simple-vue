<template>
  <div class="historyInfo">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="100%"
      height="100%"
      :before-close="handleClose">
      <div class="search text-left">
        <p>时间范围</p>
        <el-date-picker
          v-model="datetimerange"
          type="datetimerange"
          @change="querySearch"
          range-separator="至"
          start-placeholder="开始"
          end-placeholder="结束"
          size="medium"
          class="full-width mt-2">
        </el-date-picker>
      </div>
      <chart class="full-width height-270" :options="option" :auto-resize="true" />
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '气体检测曲线图'
      },
      isShow: {
        type: Boolean,
        default: false
      },
      showInfo: {},
    },
    data() {
      return {
        name: 'historyInfo',
        dialogVisible: this.isShow,
        siteInfo: [],
        datetimerange:'',
        option: {
          color: ['#67c23a', '#6a5df2', '#e6a23c', '#409eff'],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
              let result = `<p class='mb-1'>${params[0].name}</p>`;
              let unit = 'ppm';
              for (let i = 0; i < params.length; i++) {
                if (params[i].seriesName === '氧气含量') {
                  unit = '％';
                } else if (params[i].seriesName === '粉尘') {
                  unit = 'μg';
                } else {
                  unit = 'ppm';
                }
                result = result + `<p class='mb-1'>
                                        <span class='text-12 mr-1' style='color: ${params[i].color}'>●</span>
                                        ${params[i].seriesName}
                                        <span class='pl-4'>${params[i].data ? params[i].data.toFixed(1) + unit : '--'}</span>
                                   </p>`;
              }
              return result;
            }
          },
          legend: {
            data: ['可燃气体', '硫化氢', '粉尘', '氧气含量', '一氧化碳'],
            top: 10,
            itemWidth: 60
          },
          grid: {
            top: 40,
            bottom: 80,
            left: 80,
            right: 80
          },
          xAxis: {
            type: 'category',
            data: [],
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#d1d8e0'
              }
            },
            axisLabel: {
              color: '#9b9b9b',
              fontSize: 12
            },
            axisPointer: {
              show: true,
              type: 'line',
              snap: true,
              label: {
                show: false
              },
              lineStyle: {
                type: 'solid',
                color: '#68b5f1'
              }
            }
          },
          yAxis: [{
            type: 'value',
            name: '单位: ppm',
            nameTextStyle: {
              color: '#9b9b9b',
              fontSize: 12
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#9b9b9b',
              fontSize: 12,
              formatter: function (value, index) {
                return Number(value).toFixed(1);
              }
            },
            splitLine: {
              lineStyle: {
                color: '#e5eaee',
                type: 'dashed'
              }
            }
          },
            {
              position: 'right',
              type: 'value',
              name: '单位: ％',
              nameTextStyle: {
                color: '#9b9b9b',
                fontSize: 12
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#9b9b9b',
                fontSize: 12,
                formatter: function (value, index) {
                  return Number(value).toFixed(1);
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#e5eaee',
                  type: 'dashed'
                }
              }
            }],
          series: [
            {
              name: '可燃气体',
              data: [],
              type: 'line',
              smooth: true,
              symbolSize: 0
            },
            {
              name: '硫化氢',
              data: [],
              type: 'line',
              smooth: true,
              symbolSize: 0
            },
            {
              name: '粉尘',
              data: [],
              type: 'line',
              smooth: true,
              symbolSize: 0
            },
            {
              name: '氧气含量',
              data: [],
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              symbolSize: 0
            },
            {
              name: '一氧化碳',
              data: [],
              type: 'line',
              smooth: true,
              symbolSize: 0
            }
          ]
        }
      }
    },
    mounted() {
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
        this.$emit('closeDialogFather',this.dialogVisible);
      },
      querySearch() {

      }
    },
    watch: {
      isShow(val) {
        this.dialogVisible = val;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .historyInfo {
    /deep/ {
      .el-dialog__header {
        text-align: left;
      }
      .el-dialog__title {
        font-weight: 600;
      }
    }
  }
</style>
