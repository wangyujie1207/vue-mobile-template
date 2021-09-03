module.exports = ({ file }) => {
  let designWidth, designHeight
  if ((file.dirname !== undefined) && file.dirname.indexOf('vant') !== -1) {
    designWidth = 375
    designHeight = 667
  } else {
    designWidth = 750
    designHeight = 1334
  }
  return {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-aspect-ratio-mini': {},
      'postcss-write-svg': { utf8: false },
      'postcss-preset-env': {},
      'postcss-px-to-viewport': {
        viewportWidth: designWidth,
        viewportHeight: designHeight,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        exclude: [],
        minPixelValue: 1,
        mediaQuery: false
      },
      cssnano: {
        preset: 'default',
        autoprefixer: false,
        zIndex: false
      }
    }
  }
}
