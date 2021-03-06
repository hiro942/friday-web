import NProgress from 'nprogress'
import router from '@/router'
import useUserStore from '@/store/modules/user'
import 'nprogress/nprogress.css'

const whiteList = ['/user/login', '/user/register', '/user/reset-password']

router.beforeEach((to, from) => {
  NProgress.start()

  // 设置文档标题
  document.title = to?.meta?.title as string

  // TODO: for test (no need login)
  if (import.meta.env.DEV) {
    return true
  }

  const { isLogin } = useUserStore()

  // 已登陆不能再进入白名单页面, 直接跳转至主页
  if (whiteList.includes(to.path) && isLogin) {
    return { name: 'Index' }
  }

  // 未登陆状态不能进入白名单以外的页面, 重定向至登陆页
  if (!whiteList.includes(to.path) && !isLogin) {
    return { name: 'Login' }
  }

  return true
})

router.afterEach(() => {
  NProgress.done()
})
