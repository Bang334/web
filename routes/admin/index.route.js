const systemconfig=require("../../config/system")
const dasboardRoutes = require("./dasboard.route")
const producstRoutes = require("./products.route")
const productsCategoryRoutes = require("./products-category.route")
const roleRoutes = require("./role.route")

module.exports = (app) => {
    PATH_ADMIN=systemconfig.prefixAdmin
    app.use(PATH_ADMIN+'/dasboard',  dasboardRoutes);
    app.use(PATH_ADMIN+'/products',  producstRoutes);
    app.use(PATH_ADMIN+'/products-category',  productsCategoryRoutes);
    app.use(PATH_ADMIN+'/role',  roleRoutes);
};