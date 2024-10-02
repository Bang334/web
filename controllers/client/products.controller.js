const listGirl = require("../../models/girl.model")
const ListGirl=require("../../models/girl.model")
module.exports.index = async (req, res) => {
    const listGirl = await ListGirl.find({
        status: "active",
        deleted: false 
    })
    const newlistGirl=listGirl.map(item => {
        item.priceDiscount= (item.price*(100-item.discount)/100).toFixed(0)
        return item;
    })
    console.log(newlistGirl)
    res.render("client/pages/products/index",{
        pageTitle: "Trang San Pham",
        listGirl: newlistGirl,
    })
}
module.exports.detail = async(req,res) => {
    try {
        const find = {
            deleted:false,
            slug:req.params.slug,
            status:"active"
        }
        const girl= await listGirl.findOne(find)
        res.render("client/pages/detail/index",{
            girl:girl
        })
    } catch(error){
        res.redirect("/admin/products")
    }
}