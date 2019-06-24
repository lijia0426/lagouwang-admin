var express = require('express');
var router = express.Router();
const positionController=require('../controllers/position')
const oAuthBase=require('../middlewares/oAuth-base')
const uploadFile=require('../middlewares/upload-file')
router.route('/')
.all(oAuthBase)
.get(positionController.findAll)
.post(uploadFile.uploadFile,positionController.save)
.delete(positionController.delete)
.patch()

router.route('/one').get(positionController.findOne)
router.route('/update').post(uploadFile.uploadFile,positionController.update)
router.get('/find',positionController.findMany)

module.exports=router