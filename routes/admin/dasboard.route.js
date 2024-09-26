const express = require('express')
const router = express.Router();
const controllers = require("../../controllers/admin/dasboard.controller")

router.get('/',controllers.dasboard);
module.exports = router;