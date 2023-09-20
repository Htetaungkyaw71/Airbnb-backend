const multer = require('multer');

const storage = multer.memoryStorage()

module.exports = multer(
    {
        storage: storage,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: function (req, file, cb) {
            const fileRegex = new RegExp('\.(jpg|jpeg|png|webp)$');
            const fileName = file.originalname;

            if (!fileName.match(fileRegex)) {
                return cb(new Error('Invalid file type'));
            }
            cb(null, true);
        }
    })
    .single('image'); 