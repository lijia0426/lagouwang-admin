const positionModel = require('../models/position')
class PositionController {
    constructor() {

    }
    async findAll(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf8')
        let result = await positionModel.findAll(keywords)
        res.render('succ', { data: JSON.stringify(result) })
    }
    async save(req, res, next) {
        delete req.body.companyLogo
        let result = await positionModel.save({
            ...req.body,
            companyLogo: req.filename
        })
        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '数据保存成功'
                })
            })
        }
    }
    async delete(req, res, next) {
        let result = await positionModel.delete(req.body.id)
        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '删除成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '删除失败'
                })
            })
        }
    }
    async update(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf8')
        let result = await positionModel.update({
            ...req.body,
            companyLogo: req.filename
        })
        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '数据更新成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '数据更新失败'
                })
            })
        }
    }
    async findOne(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf8')
        let result = await positionModel.findOne(req.query.id)
        res.render('succ', { data: JSON.stringify(result) })
    }
    async findMany(req, res, next) {
        //获取一下前端数据
        res.set('Content-Type', 'application/json;charset=utf8')
        let { page = 0, pagesize = 10,keywords='' } = req.query
        let result = await positionModel.findMany(
            ~~page,
            ~~pagesize,
            keywords
        )
        if(result){
            res.render('succ', { data: JSON.stringify({
                result,
                total:(await positionModel.findAll(keywords)).length
            })
         })
        }

    }
}
const positionController = new PositionController()
module.exports = positionController