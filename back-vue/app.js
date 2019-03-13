const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routers/router')
const history = require('connect-history-api-fallback');

const PORT = 9527

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(router)

app.use(history({
    rewrites: [{
        from: /^\/abc$/,
        to: '/'
    }]
}))

app.use(express.static('../hello-vue/dist'));

app.listen(PORT, () => {
    console.log(`Listen port at ${PORT}`)
})