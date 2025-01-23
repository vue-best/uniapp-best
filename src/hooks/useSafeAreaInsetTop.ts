export function useSafeAreaInsetTop() {
  const safeAreaInsetTop = ref(0)

  const sysInfo = uni.getSystemInfoSync()
  // #ifndef MP
  safeAreaInsetTop.value = sysInfo.statusBarHeight
  if (sysInfo.platform == 'android') {
    safeAreaInsetTop.value = sysInfo.statusBarHeight + 50
  } else {
    safeAreaInsetTop.value = sysInfo.statusBarHeight + 45
  }
  // #endif

  // #ifdef MP-WEIXIN
  let custom = wx.getMenuButtonBoundingClientRect()
  safeAreaInsetTop.value = custom.bottom + custom.top - sysInfo.statusBarHeight
  // #endif

  // #ifdef MP-ALIPAY
  safeAreaInsetTop.value = sysInfo.statusBarHeight + sysInfo.titleBarHeight
  // #endif

  return {
    safeAreaInsetTop,
  }
}
