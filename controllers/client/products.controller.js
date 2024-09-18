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