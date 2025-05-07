document.querySelector("[button-submit]").addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.permission-checkbox');
    const selectedPermissions = {};
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const itemId = checkbox.dataset.item;
            const permission = checkbox.dataset.permission;
            if (!selectedPermissions[itemId]) {
                selectedPermissions[itemId] = {
                    id: itemId,
                    permission: []
                };
            }
            selectedPermissions[itemId].permission.push(permission);
        }
    });
    const result = Object.values(selectedPermissions);
    if(result.length>0){
        const form = document.querySelector("#form-change-permission")
        const input = form.querySelector("input[name='permission']")
        input.value = JSON.stringify(result)
        form.submit()
    }
});
const data = document.querySelector('[data-record]');
if(data){
    const record = JSON.parse(data.getAttribute('data-record'));
    // const permissions = JSON.parse(data.getAttribute('data-permissions'));

    const checkboxes = document.querySelectorAll('.permission-checkbox');

    checkboxes.forEach((checkbox) => {
        const itemId = checkbox.getAttribute('data-item');
        const permissionType = checkbox.getAttribute('data-permission');

        const hasPermission = record.some((item) => {
            return item._id === itemId && item.permissions.includes(permissionType);
        });

        if (hasPermission) {
            checkbox.checked = true;
        }
    });
}







