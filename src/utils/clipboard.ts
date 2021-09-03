import Clipboard from 'clipboard'
import { showToast } from '@/utils/toast'

const clipboard = (value: string | Element, message?: string): void => {
  const clipboard = new Clipboard(value)
  clipboard.on('success', () => {
    showToast(message ?? '已复制到剪贴板')
  })
}
export default clipboard
