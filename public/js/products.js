const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
console.log(buttonChangeStatus)
if(buttonChangeStatus.length>0){
    const formChangeStatus=document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", ()=>{
            const currentStatus = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statuschange = currentStatus=="active" ? "unactive" : "active"
            const action = path +`/${statuschange}/${id}?_method=PATCH`
            console.log(action)
            formChangeStatus.action=action
            formChangeStatus.submit()
        })
    })
}

const restore = document.querySelectorAll("[button-restore]")
console.log(restore)
if(restore.length > 0){
    const formRestore = document.querySelector("#form-restore")
    const path = formRestore.getAttribute("data-path")
    console.log(path)
    restore.forEach(button =>{
        button.addEventListener("click", () =>{
            const id = button.getAttribute("data-id")
            const action = `${path}/${id}?_method=PATCH`
            console.log(action)
            formRestore.action=action
            formRestore.submit()
        })
    })
}

