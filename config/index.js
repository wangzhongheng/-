// see http://vuejs-templates.github.io/webpack for documentation.
/**
 * 这个页面只需要改三个地方，
 * 一：22行的port，调试环境的webserver端口
 * 二：18行，true则生成sourcemap，false不生成
 */
var path = require('path')

module.exports = {
  root:{
  	env: 'root',
  	assetsRoot: path.resolve(__dirname, '../dist'),
  	assetsPublicPath: '/',//    /wechat
  },
  build: {
    env: 'production',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'staticHome',
    assetsPublicPath: '/',
    assetsSubDirectoryOfDev: 'staticHome',
    assetsPublicPathOfDev: '/',
    productionSourceMap: true,
    publishPath: 'E:/Program/Apache/Apache2.2/htdocs' // 发布到web容器，容器的地址
  },
  dev: {
    env: 'development',
    port: 8080,
    assetsPublicPath: '/',
    assetsSubDirectory: 'staticHome',
    'proxyTable': {
    	//代理配置
      	'/api': {
        	target: 'http://cptcisn.com/api',
        	//target: 'http://192.168.0.101:8080/wechat',
        	changeOrigin: true,
        	pathRewrite: {
          		'^/api': ''
        	}
      	},
    },
    cssSourceMap: false
  },
  link: {
  	
  }
}
