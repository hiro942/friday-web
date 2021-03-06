import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
  getLocal,
  LocalStorage,
  removeLocal,
  setLocal,
} from '@/utils/localStorage'
import { fetchCurrentUser, login, logout } from '@/api/user'
import { DEFAULT_AVATAR } from '@/constants'

const useUserStore = defineStore('user', () => {
  const isLogin = ref<boolean>(!!getLocal(LocalStorage.LoginState))

  const userInfo = ref<UserAPI.UserInfo>({
    email: '',
    nickname: '',
    avatarUrl: '',
    role: '',
    partyID: '',
    org: '',
  })
  const getUserInfo = async () => {
    if (isLogin.value) {
      userInfo.value = await fetchCurrentUser()
    }
  }
  getUserInfo()

  const doLogin = async (loginParams: UserAPI.LoginParams) => {
    userInfo.value = await login(loginParams)
    userInfo.value.avatarUrl = userInfo.value.avatarUrl || DEFAULT_AVATAR
    setLocal(LocalStorage.LoginState, userInfo.value)
  }

  const doLogout = async () => {
    removeLocal(LocalStorage.LoginState)
    await logout() // 退出
    window.location.reload()
  }

  const messages = ref() // 用户消息
  const updateMessages = () => {
    const local = getLocal(LocalStorage.Messages)
    if (!local) messages.value = []
    else messages.value = local.data
  }
  updateMessages()

  return {
    userInfo,
    isLogin,
    doLogin,
    doLogout,

    messages,
    updateMessages,
  }
})

export default useUserStore
