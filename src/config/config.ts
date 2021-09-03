// const CURRENT_ENV = 'development'
const CURRENT_ENV = 'production'

const URI = process.env.NODE_ENV === CURRENT_ENV ? 'http://etqt.qizekeji688.com/' : 'https://etqtdapps.com/'

const Config = {
  BASE: URI,
  BASE_URL: URI + 'api/',
  TOKEN: 'TOKEN',
  ADDRESS: 'ADDRESS',
  LANG: 'LANG',
  DEFAULT_LANG: 'cnZh'
}

export default Config
