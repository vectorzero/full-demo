module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.11.167:9527/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}