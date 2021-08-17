// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import share from './share'
import md5 from 'js-md5'
import CanvasPoster from 'vue-canvas-poster'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn
Vue.config.ignoredElements = ['wx-open-launch-weapp']
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
import clipboard from 'clipboard'

// filters
import './filters'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.config.productionTip = false
Vue.prototype.$clipboard = clipboard
Vue.prototype.$md5 = md5
Vue.use(share)
Vue.use(CanvasPoster)

// localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiNGE0MjExZjhjZGJhY2EwOGE1Mzc5Y2YyODEyYjE2ZjU0Y2QwODg0ZWNiYjBhY2I4YzMzYTU4YWE3NzYyNjQwZmE0ZGU4OGU2ZTUxZWIyIn0.eyJhdWQiOiI1MCIsImp0aSI6IjBiNGE0MjExZjhjZGJhY2EwOGE1Mzc5Y2YyODEyYjE2ZjU0Y2QwODg0ZWNiYjBhY2I4YzMzYTU4YWE3NzYyNjQwZmE0ZGU4OGU2ZTUxZWIyIiwiaWF0IjoxNjIwNjMwNjY1LCJuYmYiOjE2MjA2MzA2NjUsImV4cCI6MTY1MjE2NjY2NSwic3ViIjoiODE2MyIsInNjb3BlcyI6W119.dd1xREuX_jvOCEaWLEmOO6ASvz91t9yqhq-aSzshKHcOzFTXU2DZTApstbFd-6BuiKfD7XImD82gVHcbWkzk01LBmGDaQpWzsVJXH_7Qx7KyuUe-OKMKY2JpQItThx7GTVfRFdAyUkXQok7BDl4ZYrApV3Q1Sx3Rr-U7azlzm_ffqslZJrWnb12aYhJZg8INH-X4HT3Ancn5MaDUXs_w7t_r3Hhyw0oxZgeuPYSu1Zh5EP_TxLZMPXsB0cUuclwrcx36vU6IakhIAbC2ugBjp0Kfq1vUI-x1ZGkjPSZ3IRakwCavkbTmQ1FJ8cMYdHt8wa9dks5JaTGgKgv9fy4oA-gTyhwQAjViMe2SaJKtXj6-sjCc9nhUx9i4sThCVm5HhYisCWLdV3SoDH4RGxU6lBJGpBJmegfBiHFdsoHcS9feC19i55Iyp49FzarAyNoEOiU23Q3aokuAYtt66iwaHUgHWUbjAJx79iKu0XDJWI8qRKRuzTs9MJtUKEVxpgH3ULPoipP9Qfz8Kexdcf55Z-AmeFOqBveRS_tWgCLDB1WcsoSqJHDtDq6gFBomi4YAeLpjy4CrzmlAJ2FNGFZD4bWgSp9he14MZC_EdRgwQdaQcrRGs9uCilIp-pMQ9b_N_kwM1cbltrdFxqJNMm38CMekkNdtBRtfhZc_Jwh4m6Y')
// localStorage.setItem('openid', 'ou713v8qqaZWUHQu5hauJ7lgMucc')

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    window.location.reload()
  } else {
    console.log(error)
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  localStorage.removeItem('aliplayer_lang_data_h5_2_8_8_zh-cn')
  localStorage.removeItem('wxConfig')
  if (to.query.from_user_id) {
    localStorage.setItem('from_user_id', to.query.from_user_id)
  }
  if (to.query.from_openid) {
    localStorage.setItem('from_openid', to.query.from_openid)
  }
  if (to.query.openid) {
    localStorage.setItem('openid', to.query.openid)
  }
  if (to.query.from_platform) {
    localStorage.setItem('from_platform', to.query.from_platform)
  }
  // if (!location.href.includes('microScenario') && !location.href.includes('activityDetail') && !location.href.includes('activityOrder') && !location.href.includes('orderDetail') && !location.href.includes('paySuccessful') && !location.href.includes('activityJump') && !localStorage.getItem('openid')) {
  //   window.location.replace(
  //     `https://love.ufutx.com/api/official/live/wechat/oauth?url=` + encodeURIComponent(`https://love.ufutx.com/h5/#${to.path}`)
  //   )
  // }
  next()
})

router.afterEach((to, from) => {
  if (window.ga) {
    // console.log(to.path, 'asdddddddddddddddddddddd')
    window.ga('set', 'page', to.meta.title) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
    // window.ga('send', 'event', 'link', 'click', 'http://example.com', {
    //   nonInteraction: true
    // })
  }
})
Vue.prototype.$BuriedPoint = (action, label, value) => {
  if (value === undefined) {
    window.ga && window.ga('send', 'event', action, label)
  } else {
    window.ga && window.ga('send', 'event', action, label, value)
  }
}
Vue.prototype.$isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.includes('micromessenger')) {
    return true
  } else {
    return false
  }
}
Vue.prototype.$isIOS = () => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  if (isAndroid) {
    return false
  } else {
    return true
  }
}
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/assets/i18n/zh.js'),
    'en': require('@/assets/i18n/en.js')
  }
})
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
