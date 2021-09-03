import { Toast } from 'vant'
import { ToastType } from 'vant/es/toast'
import { ComponentInstance } from 'vant/lib/utils'

export const showLoading = (message?: string, forbidClick?: boolean): ComponentInstance => {
  return Toast.loading({
    message: message ?? '加载中..',
    forbidClick: forbidClick ?? true,
    duration: 0
  })
}

export const showToast = (message: string, type?: ToastType): ComponentInstance => {
  if (type === 'success') {
    return Toast.success(message)
  } else if (type === 'fail') {
    return Toast.fail(message)
  } else {
    return Toast(message)
  }
}
