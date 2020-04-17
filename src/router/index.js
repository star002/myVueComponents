import Vue from 'vue'
import VueRouter from 'vue-router'
import MinePage from '@/views/mine'
import pickerDemoPage from '@/views/picker-demo'
import chooseImageDemoPage from '@/views/choose-image-demo'
import cookieDemoPage from '@/views/cookie-demo'
import cloneObjDemoPage from '@/views/clone-obj-demo'

Vue.use(VueRouter)

  const routes = [{
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router