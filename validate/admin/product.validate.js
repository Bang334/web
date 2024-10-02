module.exports.getcreate = (req,res,next)=>{
    if (!req.body.name) {
        req.flash('warning', 'Bắt buộc phải nhập tên');
        res.redirect('back');
        return 
    }
    next()
}