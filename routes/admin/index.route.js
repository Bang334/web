const systemconfig=require("../../config/system")
const dasboardRoutes = require("./dasboard.route")
const producstRoutes = require("./products.route")
module.exports = (app) => {
    PATH_ADMIN=systemconfig.prefixAdmin
    app.use(PATH_ADMIN+'/dasboard',  dasboardRoutes);
    app.use(PATH_ADMIN+'/products',  producstRoutes);
};