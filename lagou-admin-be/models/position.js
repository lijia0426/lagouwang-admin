const db = require('../utils/db')
class PositionModel {
    constructor() {
        let PositionSchema = {
            companyLogo: String,
            companyName: String,
            positionName: String,
            city: String,
            salary: String,
            createTime: String
        }
        this.positionModel = db.model('positions', PositionSchema)
    }
    //职位信息保存
    save(data) {
        const position = new this.positionModel({
            ...data,
            createTime: '2019年6月21日'
        })
        return position.save()
    }
    //查询所有数据
    findAll(keywords) {
        let regexp=new RegExp(keywords,"i")
        return this.positionModel.find({}).sort({ _id: -1 })
        .or({companyName:regexp},{positionName:regexp})
    }
    //删除数据
    delete(id) {
        return this.positionModel.deleteOne({ '_id': id })
    }
    findOne(id) {
        return this.positionModel.findById(id)
    }
    //更新数据
    update(data) {
        if (data.companyLogo === '') {
            let { companyName, positionName, city, salary } = data
            return this.positionModel.findOneAndUpdate({ _id: data.id }, { companyName, positionName, city, salary })
        } else {
            let { companyLogo, companyName, positionName, city, salary } = data
            return this.positionModel.findOneAndUpdate({ _id: data.id }, { companyLogo, companyName, positionName, city, salary })
        };



    }
    //查询部分数据
    findMany(page, pagesize,keywords) {
        let regexp=new RegExp(keywords,"i")
        return this.positionModel.find({}).skip(pagesize * page).limit(pagesize).sort({ _id: -1 })
        .or({companyName:regexp},{positionName:regexp})
    }
}
const positionModel = new PositionModel()
module.exports = positionModel;