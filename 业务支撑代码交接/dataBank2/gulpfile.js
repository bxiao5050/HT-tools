const gulp = require('gulp')
const esdoc = require('gulp-esdoc')
const connect = require('gulp-connect')

gulp
  .task('default', ['connect', 'esdoc'])
  .task('connect', function() {
    connect.server({
      port: 9999,
      root: './esdoc',
      livereload: true
    })
  })
  .task('esdoc', () => {
    gulp.watch(['./src/**/*'], ['esdoc_'])
  })
  .task('esdoc_', () => {
    gulp.src("./src/**/*").pipe(esdoc({
      "source": "./src/components/modules/channel/register/",
      "includes": ["\\.(js|vue)$"],
      "destination": "./esdoc",
      "manual": {
        "globalIndex": false,
        "asset": "./manual/asset",
        "overview": ["./manual/overview.md"]
      },
      "experimentalProposal": {
        "classProperties": true,
        "objectRestSpread": true
      },
      "styles": ["./esdoc/style.css"],
      "plugins": [
        { "name": "esdoc-vue-plugin", "option": null }, { "name": "esdoc-undocumented-identifier-plugin", "option": { "enable": true } }
      ]
    })).pipe(connect.reload())
  })