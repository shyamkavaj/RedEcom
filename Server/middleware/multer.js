const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:'./uploads',
    filename: (req, file, cb) => {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

module.exports = upload;