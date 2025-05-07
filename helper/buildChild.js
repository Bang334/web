module.exports.buildChild = (data) => {
    const map = {}; 
    const result = []; 
    data.forEach(item => {
        map[item._id] = { ...item, children: [] };
    });
    data.forEach(item => {
        if (item.parent === "") {
            result.push(map[item._id]);
        } else {
            const parent = data.find(d => d.name === item.parent);
            if (parent && map[parent._id]) {
                map[parent._id].children.push(map[item._id]);
            }
        }
    });
    return result;
}