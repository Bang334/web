const info = require("../../models/info.model")
const buildChildHelper = require("../../helper/buildChild")
const infoGirl = require("../../models/info.model")
module.exports.index = ( async (req, res) => {
    const infoGirl=await info.find({})
    res.render("admin/pages/products-cetegory/index",{
        infoGirl:infoGirl,
    })
})

module.exports.create = ( async (req, res) => {
    const infoGirl = await info.find({});
    const relative = buildChildHelper.buildChild(infoGirl); 
    res.render("admin/pages/products-cetegory/create",{
        infoGirl:relative,
    })
})
module.exports.edit = ( async (req, res) => {
    try {
        const find = {
            deleted:false,
            _id: req.params.id
        }
        const infoGirl = await info.findOne(find);
        const relative = buildChildHelper.buildChild(await info.find({})); 
        res.render("admin/pages/products-cetegory/edit",{
            infoGirl:infoGirl,
            relative:relative,
        })
    } catch (error) {
        res.redirect('/admin/products-category')
    }

})
module.exports.editPatch = ( async (req, res) => {
    await infoGirl.updateOne({_id:req.params.id},req.body)
    res.redirect('/admin/products-category')
})
module.exports.createParent = async (req, res) => {
    try {
        const newGirl = new info({
            name: req.body.name,
            parent: req.body.parent || '', 
            status: req.body.status || 'active', 
            image: req.file ? req.file.path : '', 
            des: req.body.des || '',
            stock: req.body.stock || 0, 
            position: req.body.position || 0, 
        });
        await newGirl.save();
        res.redirect('/admin/products-category'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Đã xảy ra lỗi khi thêm mới.');
    }
}