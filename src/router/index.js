import Vue from 'vue'
import Router from 'vue-router'
import MinePage from '@/pages/mine'
import pickerDemoPage from '@/pages/picker-demo'
import chooseImageDemoPage from '@/pages/choose-image-demo'
import cookieDemoPage from '@/pages/cookie-demo'
import cloneObjDemoPage from '@/pages/clone-obj-demo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/mine',
    name: 'mine',
    component: MinePage
  }, {
    path: '/',
    name: 'mine',
    component: MinePage
  }, {
    path: '/picker',
    name: 'picker',
    component: pickerDemoPage
  }, {
    path: '/choose-image',
    name: 'choose-image',
    component: chooseImageDemoPage
  }, {
    path: '/cookie',
    name: 'cookie',
    component: cookieDemoPage
  }, {
    path: '/clone-obj',
    name: 'clone-obj',
    component: cloneObjDemoPage
  }]
})
