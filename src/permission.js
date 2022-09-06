import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken, setAvatar, setToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path: '/'})
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      const getUrl = window.location.href;
      const obj = {}  //创建空对象，接收截取的参数
      if(getUrl.indexOf('?')!==-1&&getUrl.indexOf("&")!==-1){
        const getKVInfo = getUrl.split('?')[1]
        const getKVs = getKVInfo.split('&')
        for (let i = 0; i < getKVs.length; i++) {
          console.log(i)
          let item = getKVs[i].split('=')
          let key = item[0]
          let value = item[1]
          obj[key] = value
        }
      }
      if (obj['Token']) {
        store.commit('user/SET_NAME', obj['username'])
        store.commit('user/SET_TOKEN', obj['Token'])
        store.commit('user/SET_AVATAR', obj['avatar'])
        setToken(obj['Token'])
        //setAvatar(obj['avatar'])
        next()
        NProgress.done()
      } else {
        window.location.href = 'https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri='
          + 'http://localhost:8081/user/loginByCode'
          + '&app_id=cli_a385a57fb3b8500d'
        // other pages that do not have permission to access are redirected to the login page.
        //next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

/*export function parseUrl() {
  let getUrl = window.location.href
  let getKVInfo = getUrl.split('?')[1]
  let getKVs = getKVInfo.split('&')
  let obj = {}  //创建空对象，接收截取的参数
  for (let i = 0; i < getKVs.length; i++) {
    console.log(i)
    let item = getKVs[i].split('=')
    let key = item[0]
    let value = item[1]
    obj[key] = value
  }
  console.log(obj)
  store.commit('user/SET_TOKEN', obj['Token'])
  store.commit('user/SET_AVATAR', obj['avatar'])
  store.commit('user/SET_NAME', obj['username'])
  // setToken(obj["Token"])
  //console.log("getUrl",getUrl)

}*/
