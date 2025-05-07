const Role = require("../../models/role.model")
module.exports.index = async (req, res) => {
    let find ={
        deleted: false
    }
    const records = await Role.find(find)
    res.render("admin/pages/role/index",{
        records:records
    })
}
module.exports.create = async (req, res) => {
    res.render("admin/pages/role/create",{
    })
}
module.exports.createPost = async (req, res) => {
    console.log(req.body)
    const record = new Role(req.body)
    await record.save()
    res.redirect("/admin/role")
}
module.exports.edit = async (req, res) => {
    const id = req.params.id
    let find = {
        _id:id
    }
    const record = await Role.findOne(find)
    res.render("admin/pages/role/edit",{
        record:record
    })
}
module.exports.editPost = async (req, res) => {
    const id = req.params.id
    await Role.updateOne({_id:id},req.body)
    res.redirect("/admin/role")
}
module.exports.delete = async (req, res) => {
    const id = req.params.id
    await Role.updateOne({_id:id},{deleted:true})
    res.redirect("/admin/role")
}
module.exports.get = async (req, res) => {
    const id = req.params.id
    await Role.deleteOne({_id:id})
    console.log(id)
    res.redirect("back")
}
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find)
    res.render("admin/pages/role/permissions",{
        record:record
    })
}
module.exports.permissionsPatch = async (req, res) => {
    const Permission= JSON.parse(req.body.permission)
    for (const item of Permission){
        await Role.updateOne({_id:item.id},{permissions:item.permission})
    }
    res.redirect("back")
}