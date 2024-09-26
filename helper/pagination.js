module.exports = (objectPagination,query,countGirl) =>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page)
    }
    objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItem

    const totalPage = Math.ceil(countGirl/objectPagination.limitItem)
    objectPagination.totalPage=totalPage
    return objectPagination
}