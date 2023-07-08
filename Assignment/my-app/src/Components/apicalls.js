import { HEADERS, URLS } from "../Global"


let fetchUser = ()=>{
    return fetch(URLS)
}

let fetchUserById = (id)=>{
    return fetch(URLS + id)
}

let updateUser = (id, data) =>{
    return fetch(URLS+id,{
        method: "PUT",
        body:JSON.stringify(data),
        headers: HEADERS
    }) 
}

let addUser = (data) =>{
    return fetch(URLS,{
        method: "POST",
        body:JSON.stringify(data),
        headers: HEADERS
    }) 
}

let deleteData = (id)=>{
   return fetch(URLS+id, {
    method: "DELETE"
   })
}

export {addUser, fetchUser,fetchUserById, deleteData,updateUser}