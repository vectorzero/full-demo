const mysql = require('mysql')
const db = require('../db/db')
const $newsSql = require('../db/newsSql')

let pool = mysql.createPool(db.mysql)

let queryAll = (req, res, next) => {
    pool.getConnection((error, connect) => {
        if (error) {
            throw error
        } else {
            connect.query($newsSql.queryAll, (error, data) => {
                if (error) {
                    res.json({
                        code: '500',
                        msg: 'error',
                        data
                    })
                } else {
                    res.json({
                        code: '200',
                        msg: 'success',
                        data
                    })
                }
                connect.release()
            })
        }
    })
}

let queryById = (req, res, next) => {
    let id = +req.query.id
    pool.getConnection((error, connect) => {
        if (error) {
            throw error
        } else {
            connect.query($newsSql.queryById, id, (error, data) => {
                if (error) {
                    res.json({
                        code: '500',
                        msg: 'error',
                        data
                    })
                } else {
                    res.json({
                        code: '200',
                        msg: 'success',
                        data
                    })
                }
                connect.release()
            })
        }
    })
}

let add = (req, res, next) => {
    let rb = req.body
    let params = [rb.type, rb.title, rb.description, rb.occur_time, rb.url, rb.newsImg]
    pool.getConnection((error, connect) => {
        if (error) {
            throw error
        } else {
            connect.query($newsSql.add, params, (error, data) => {
                if (error) {
                    res.json({
                        code: '500',
                        msg: 'error',
                        data
                    })
                } else {
                    res.json({
                        code: '200',
                        msg: 'success',
                        data
                    })
                }
                connect.release()
            })
        }
    })
}

let update = (req, res, next) => {
    let rb = req.body
    let params = [rb.type, rb.title, rb.description, rb.occur_time, rb.url, rb.newsImg, rb.id]
    pool.getConnection((error, connect) => {
        if (error) {
            throw error
        } else {
            connect.query($newsSql.update, [...params], (error, data) => {
                if (error) {
                    res.json({
                        code: '500',
                        msg: 'error',
                        data
                    })
                } else {
                    res.json({
                        code: '200',
                        msg: 'success',
                        data
                    })
                }
                connect.release()
            })
        }
    })
}

let deleteNews = (req, res, next) => {
    let id = +req.query.id
    pool.getConnection((error, connect) => {
        if (error) {
            throw error
        } else {
            connect.query($newsSql.delete, id, (error, data) => {
                if (error) {
                    throw error
                }
                res.json({
                    code: '200',
                    msg: 'success'
                })
                connect.release()
            })
        }
    })
}

module.exports = {
    queryAll,
    queryById,
    add,
    update,
    deleteNews
}
