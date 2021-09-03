/* eslint-disable */
import { useI18n } from 'vue-i18n'
import storage from 'good-storage'
import Config from '@/config/config'
import { onMounted, ref } from 'vue'

export interface LangBean {
  label: string;
  local: string;
}

const i18nArray: LangBean[] = [
  {
    label: '简体中文',
    local: 'cnZH'
  },
  {
    label: '繁體中文',
    local: 'cnHK'
  },
  {
    label: 'English',
    local: 'en'
  }
]
const useI18nHooks = () => {
  const {
    locale,
    t
  } = useI18n()

  const currentLocal = ref<string>('')

  onMounted(() => {
    currentLocal.value = locale.value || Config.DEFAULT_LANG
  })

  const changeLang = (local: string) => {
    currentLocal.value = local
    locale.value = local
    storage.set(Config.LANG, local)
  }

  return {
    changeLang,
    t,
    i18nArray,
    currentLocal
  }
}

export default useI18nHooks
