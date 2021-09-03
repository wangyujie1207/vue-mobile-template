import { createI18n } from 'vue-i18n'
import messages from '@/lang/index'
import storage from 'good-storage'
import Config from '@/config/config'

const i18n = createI18n({
  locale: storage.get(Config.LANG) || Config.DEFAULT_LANG,
  messages
})

export default i18n
