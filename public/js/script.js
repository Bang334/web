document.querySelectorAll("[button-change-status]").forEach(function(span) {
    span.addEventListener("click", function() {
        if (this.classList.contains("kind1")) {
            this.classList.remove("kind1");
            this.classList.add("kind2");
            this.innerText="unactive";
            // showAlert('Trạng thái đã được chuyển sang unactive', 'success');
        } else {
            this.classList.remove("kind2");
            this.classList.add("kind1");
            this.innerText="active";
            // showAlert('Trạng thái đã được chuyển sang active', 'success');
        }
    });
});

document.querySelectorAll(".wrap-buttomstatus button").forEach(function(button) {
    button.addEventListener("click", function() {
        document.querySelectorAll("[buttomstatus]").forEach(function(btn) {
            btn.classList.remove("buttomstatusfocus");
        });
        this.classList.add("buttomstatusfocus");
    });
});

const buttomStatus=document.querySelectorAll("[buttomstatus]");
if(buttomStatus.length>0){

    let url=new URL(window.location.href);
    buttomStatus.forEach(button =>{
        button.addEventListener("click",() => {
            const status=button.getAttribute("buttomstatus")
            url.searchParams.set("page",1)
            if(status){
                url.searchParams.set("status",status)
            }else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}

const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url=new URL(window.location.href);
    formSearch.addEventListener("submit",(e) => {
        e.preventDefault();
        const keyword=e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword)
            url.searchParams.set("page",1)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}

const buttonpage = document.querySelectorAll("[indexPage]")
if(buttonpage){
    let url=new URL(window.location.href);
    buttonpage.forEach(function(button){
        button.addEventListener("click", () =>{
            const page = button.getAttribute("indexPage")
            url.searchParams.set("page",page)
            window.location.href = url.href
        })
    })
}

function toggleAllCheckboxes() {
    const checkboxMulti = document.querySelector('[name="checkall"]');
    const checkboxes = document.querySelectorAll('[name="id"]');

    checkboxes.forEach(check => {
        check.checked = checkboxMulti.checked;
    });
}

function updateCheckAllCheckbox() {
    const checkboxMulti = document.querySelector('[name="checkall"]');
    const checkboxes = document.querySelectorAll('[name="id"]');

    const allChecked = Array.from(checkboxes).every(check => check.checked);
    checkboxMulti.checked = allChecked; 
}

document.querySelectorAll('[name="id"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckAllCheckbox);
});


const formChangemulti = document.querySelector("[form-change-multi]");
if (formChangemulti) {
    formChangemulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxesChecked = document.querySelectorAll('input[name="id"]:checked');
        const typechange = e.target.elements.type.value;
        if(typechange=="delete-all"){
            const isConfirm=confirm("Bạn chắc chắn muốn xóa chứ ?")
            if(!isConfirm){
                return;
            }
        }
        if (checkboxesChecked.length > 0) {
            let ids = [];
            checkboxesChecked.forEach(input => {
                const id = input.value;
                ids.push(id);
            });
            const idsInput = document.querySelector('input[name="ids"]');
            if (idsInput) {
                idsInput.value = ids.join(',');
            }
            console.log(formChangemulti)
            formChangemulti.submit();
        } else {
            alert("Chọn ít nhất 1 bản ghi");
        }
    });
}

const buttonsDelete=document.querySelectorAll("[button-delete]")
if(buttonsDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-item")
    const path=formDeleteItem.getAttribute("data-path")
    buttonsDelete.forEach(button =>{
        button.addEventListener("click",() =>{
            const isConfirm=confirm("Bạn chắc chắn muốn xóa chứ?")
            if(isConfirm){
                const id=button.getAttribute("data-id")
                const action=`${path}/${id}?_method=DELETE`
                formDeleteItem.action=action
                console.log(formDeleteItem.action)
                formDeleteItem.submit()
            }
        })
    })
}

const restoreButton = document.querySelector(".Restore-Button")
if(restoreButton){
    restoreButton.addEventListener("click", () => {
        restoremulti = document.querySelector("#restoremulti");
        let ids = [];
        const inputIds = document.querySelector("#input-ids");
        const checkboxesChecked = document.querySelectorAll('input[name="id"]:checked'); 
        checkboxesChecked.forEach(input => {
            const id = input.value;
            ids.push(id);
        });
    
        if (ids.length === 0) {
            alert("No items selected for restore.");
            return;
        }
        inputIds.value = ids.join(',');
        restoremulti.submit();
    });
}

function showAlert(message, type = 'success', duration = 3000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        const newContainer = document.createElement('div');
        newContainer.id = 'alert-container';
        newContainer.style.position = 'fixed';
        newContainer.style.top = '20px';
        newContainer.style.right = '20px';
        newContainer.style.width = '33.33%';
        document.body.appendChild(newContainer);
    }
    document.getElementById('alert-container').appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.style.transition = 'transform 0.5s ease-out';
        alertDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            alertDiv.remove();
        }, 500);
    }, duration);
}
const creat=document.querySelector("#creat-girl")
if(creat){
    creat.addEventListener("click",() => {
        window.location.href = '/admin/products/create';
    })
}