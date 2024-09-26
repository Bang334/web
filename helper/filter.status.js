module.exports = (query) => {
    let filterstatus = [
        {
            name: "Tât cả",
            status:"",
            class:"",
        },
        {
            name: "Hoạt động",
            status:"active",
            class:"",
        },
        {
            name: "Dừng hoạt động",
            status:"unactive",
            class:"",
        }
    ];
    if(query.status){
        const index=filterstatus.findIndex(item => item.status==query.status)
        filterstatus[index].class="buttomstatusfocus";
    }
    else{
        const index=filterstatus.findIndex(item => item.status=="")
        filterstatus[index].class="buttomstatusfocus";
    }
    return filterstatus;
}