const express = require('express')
require('dotenv').config()
const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")
const systemConfig=require("./config/system")
const database=require("./config/database")
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
//Này ngu ngu
const flash = require('express-flash')
const cookieParser = require("cookie-parser");
const session = require("express-session");
//bỏ cũng đc
const slug = require('mongoose-slug-updater');

database.connect()

const app = express()
const port = process.env.PORT;

app.locals.prefixAdmin=systemConfig.prefixAdmin
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))
//Này ngu ngu
app.use(flash());
app.use(cookieParser('HRWEWFWEF'));
app.use(session({ cookie: { maxAge: 60000 }}));
//bỏ cũng đc
route(app)
routeAdmin(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


