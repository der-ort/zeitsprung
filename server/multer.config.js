const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');


// set upload directory for the storage dir used by multer
// and check if uploadDirectory exists, else create
const uploadDirectory = path.join(__dirname, 'assets/');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// set multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);  // Use the absolute path
    },
    filename: function (req, file, cb) {
        // Set file name: original name + date.now + extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// export upload for router.js
module.exports = {upload};