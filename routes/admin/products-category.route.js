const express = require('express')
const router = express.Router();
const controllers = require("../../controllers/admin/products-category.controller")
const validate = require("../../validate/admin/product.validate")
// const validate = require("../../validate/admin/product.validate")
const multer  = require('multer')

const uploadCloud = require("../../middlewares/admin/upload.cloud.middlewares")
const upload = multer()
router.get('/',controllers.index);
router.get('/create',controllers.create);
router.post('/create', 
    upload.single('image'), 
    uploadCloud.uploadCloud,
    validate.getcreate,
    controllers.createParent);
router.get('/edit/:id',controllers.edit);
router.patch('/edit/:id',
    upload.single('image'), 
    uploadCloud.uploadCloud,
    validate.getcreate,
    controllers.editPatch);

module.exports = router;

