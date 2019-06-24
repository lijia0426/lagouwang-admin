const multer = require('multer')//处理和接受multipart/form-data
const path = require('path')
const randomString = require('node-random-string')
class FileUpload {
    _fileFilter(req, file, cb) {
        let mimeRegexp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)', 'gi')
        if (mimeRegexp.test(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('文件格式不正确'))
        }
    }
    uploadFile(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let files = ''
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '../public/images'))
            },
            filename: (req, file, cb) => {
                let fileOriname = file.originalname;
                let lastDoc = fileOriname.lastIndexOf('.')
                let extFilename = fileOriname.slice(lastDoc)
                let rs = randomString({
                    length: 10,
                    lowerCase: true
                });
                files = rs + extFilename
                cb(null, files)
            }
        })
        var upload = multer({
            storage,
            limits: {
                fileSize: 1024 * 1024
            },
            fileFilter: fileupload._fileFilter
        }).single('companyLogo')
        upload(req, res, function (err) {
            if (req.body.company === '') {
                next()
            } else {
                if (err) {

                    res.render('fail', {
                        data: JSON.stringify(err.message)
                    })
                } else {
                    req.filename = files;
                    next()
                }
            }

        })

    }
}
const fileupload = new FileUpload()
module.exports = fileupload;