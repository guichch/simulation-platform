const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('network', resolve('src/network'))

    },
    devServer: {
        proxy: {
            '/apis': {
                target: 'http://121.31.6.255',
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    }
}