// /admin/dasboard
module.exports.dasboard = ( (req, res) => {
    res.render("admin/pages/dasboard/index",{
        pageTitle: "Trang Tong Quan",
    })
})