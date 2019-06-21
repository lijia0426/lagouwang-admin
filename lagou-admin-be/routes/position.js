var express = require('express');
var router = express.Router();
const positionController=require('../controllers/position')
const oAuthBase=require('../middlewares/oAuth-base')
const uploadFile=require('../middlewares/upload-file')
router.route('/')
.all(oAuthBase)
.get(positionController.findAll)
.post(uploadFile.uploadFile,positionController.save)


module.exports=router