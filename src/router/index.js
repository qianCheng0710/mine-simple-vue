import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '~views/login/index.vue'
import rollOverQuality from '~views/rollOverQuality/index.vue'
import atlasTypes from '~views/atlasTypes/index.vue'
import addAtlas from '~views/atlasTypes/components/addAtlas.vue'
import fieldTest from '~views/fieldTest/index.vue'
import mainControl from '~views/mainControl/index.vue'
import videoMonitor from '~views/videoMonitor/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/rollOverQuality',
      name: '碾压质量',
      component: rollOverQuality
    },
    {
      path: '/atlasTypes',
      name: '工程图集',
      component: atlasTypes
    },
    {
      path: '/fieldTest',
      name: '现场监测',
      component: fieldTest,
    },
    {
      path: '/mainControl',
      name: '欢迎使用黄南水库APP',
      component: mainControl
    },
    {
      path: '/videoMonitor',
      name: '视频监控',
      component: videoMonitor
    },
    {
      path: '/addAtlas',
      name: '添加图集',
      component: addAtlas
    }
  ]
})
