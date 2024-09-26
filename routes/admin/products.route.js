const express = require('express')
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller")
const multer  = require('multer')
const storageMulter= require("../../helper/storageMulter")
const upload = multer({storage:storageMulter()})
router.get('/',controllers.index);
router.patch('/change-status/:status/:id',controllers.changeStatus);
router.patch('/change-multi',controllers.changeMulti);
router.delete('/delete/:id',controllers.deleteItem);
router.get('/restore',controllers.restore)
router.patch('/res/:id',controllers.restoreItem)
router.patch('/restore-multi',controllers.restoreMulti);
router.get('/create',controllers.create)
router.post('/create',upload.single('image'),controllers.getcreate)

module.exports = router;

