// /admin/products
const listGirl = require("../../models/girl.model")
const filterStatusHelper = require("../../helper/filter.status")
const searchInfo = require("../../helper/search")
const pagePagination = require("../../helper/pagination")
const systemConfig= require("../../config/system")
module.exports.index = ( async (req, res) => {
    // Thay thế bên helper
    const filterstatus = filterStatusHelper(req.query)
    let find={
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status
    }
    // search bên helper
    const objectSearch = searchInfo(req.query)
    if(objectSearch.regex){
        find.name=objectSearch.regex
    }
    //Phân trang(pagination)
    const countGirl = await listGirl.countDocuments(find)
    let objectPagination = pagePagination(
        {        
            limitItem:4,
            currentPage:1,
        },
        req.query,
        countGirl
    )
    //End phân trang
    const ListGirl=await listGirl.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort({position:"desc"})
    res.render("admin/pages/products/index",{
        pageTitle: "Danh sách bạn nữ",
        ListGirl:ListGirl,
        filterstatus:filterstatus,
        keyword:objectSearch.keyword,
        pagination:objectPagination,
    })
})
///change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    console.log(req.params)
    const status=req.params.status
    const id=req.params.id
    await listGirl.updateOne({ _id:id},{status:status});
    req.flash("success",`Cap nhat trang thai thanh ${status}`) 
    res.redirect("back")
}

///change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(",")
    console.log(req.body, req.params)
    switch (type){
        case "active":
            await listGirl.updateMany({_id: {$in: ids}},{status:"active"})
            req.flash("success",`Cap nhat trang thai avtive thanh cong cho ${ids.length} san pham`)
            break;
        case "unactive":
            await listGirl.updateMany({_id: {$in: ids}},{status:"unactive"})
            req.flash("success",`Cap nhat trang thai unavtive thanh cong cho ${ids.length} san pham`)
            break;
        case "delete-all":
            await listGirl.updateMany({_id: {$in: ids}},{deleted:true, deletedAt: new Date()})
            req.flash("success",`Xoa thanh cong ${ids.length} san pham`)
            break;
    }
    res.redirect("back")
}
//delete
module.exports.deleteItem = async (req, res) => {
    const id=req.params.id
    // await listGirl.deleteOne({ _id:id});
    await listGirl.updateOne({ _id:id}, 
        {deleted : true, 
        deletedAt: new Date()});
    res.redirect("back")
}

module.exports.restore = async (req, res) => {
    let find={
        deleted: true
    }
    const ListGirl=await listGirl.find(find)
    console.log(ListGirl)
    res.render("admin/pages/restore/index",{
        ListGirl:ListGirl
    })
}
module.exports.restoreItem = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await listGirl.updateOne({_id:id},{deleted:false})
    res.redirect("back")
}

module.exports.restoreMulti = async (req, res) => {
    const ids = req.body.ids.split(",")
    console.log(ids)
    await listGirl.updateMany({_id: {$in: ids}},{deleted:false})
    res.redirect("back")
}

module.exports.create = (req, res) => {
    res.render("admin/pages/create/index",{
    })
}
module.exports.getcreate = async (req, res) => {
    req.body.age=parseInt(req.body.age)
    req.body.price=parseInt(req.body.price)
    req.body.stock=parseInt(req.body.stock)
    req.body.discount=parseInt(req.body.discount)
    if(req.file){
        req.body.image=`/uploads/${req.file.filename}`
    }
    console.log(req.body)
    const girl = new listGirl(req.body)
    await girl.save()
    res.redirect(`${systemConfig.prefixAdmin}/products`); 
}
//edit
module.exports.edit = async (req, res) => {
    // console.log(req)
    const find = {
        deleted:false,
        _id: req.params.id
    }
    const girl = await listGirl.findOne(find)
    res.render("admin/pages/edit/index",{
        girl:girl
    })
}

module.exports.editPatch = async(req,res) => {
    req.body.age=parseInt(req.body.age)
    req.body.price=parseInt(req.body.price)
    req.body.stock=parseInt(req.body.stock)
    req.body.discount=parseInt(req.body.discount)
    if(req.file){
        req.body.image=`/uploads/${req.file.filename}`
    }
    try{
        await listGirl.updateOne({_id:req.params.id},req.body)
    } catch(error){
        console.log("Loi update")
    }
    req.flash("success","Cập nhật thành công ")
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

module.exports.detail =async (req, res) => {
    const find = {
        deleted:false,
        _id: req.params.id
    }
    const girl = await listGirl.findOne(find)
    res.render("admin/pages/detail/index",{
        girl:girl
    })
}