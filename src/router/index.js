import Vue from 'vue'
import VueRouter from 'vue-router'
import MinePage from '@/views/mine'
import pickerDemoPage from '@/views/picker-demo'
import chooseImageDemoPage from '@/views/choose-image-demo'
import swiperDemoPage from '@/views/swiper-demo'
import cookieDemoPage from '@/views/cookie-demo'
import cascaderDemoPage from '@/views/cascader-demo'
import checkboxDemoPage from '@/views/checkbox-demo'
import closeIconDemoPage from '@/views/close-icon-demo'
//close-demo
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
    path: '/swiper',
    name: 'swiper',
    component: swiperDemoPage
  }, {
    path: '/cookie',
    name: 'cookie',
    component: cookieDemoPage
  }, {
    path: '/cascader',
    name: 'cascader',
    component: cascaderDemoPage
  }, {
    path: '/checkbox',
    name: 'checkbox',
    component: checkboxDemoPage
  }, {
    path: '/close-icon',
    name: 'close-icon',
    component: closeIconDemoPage
  }]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
export default router