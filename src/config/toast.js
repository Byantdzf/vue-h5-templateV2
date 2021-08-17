import { Toast } from 'vant'

export const $toastText = (title) => {
  Toast({
    message: title,
    forbidClick: true
  })
}

export const $toastSuccess = (title) => {
  Toast.success({
    message: title,
    forbidClick: true
  })
}

export const $toastLoading = (title) => {
  Toast.loading({
    message: title,
    duration: 0,
    forbidClick: true
  })
}

export const $toastClear = () => {
  Toast.clear()
}
