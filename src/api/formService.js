import { Proxy } from "./Proxy";



export async function GetAllForm(request) {
    
    return await Proxy("post","/form/get-all", request);
}

export async function SaveForm(request) {
    
    return await Proxy("post","/form/create", request);
}
export async function UpdateForm(id,request) {
    
    return await Proxy("post","/form/update/"+id, request);
}
export async function SeachForm(id,request) {
    
    return await Proxy("post","/form/search/"+id, request);
}

export async function DeleteForm(id,request) {
    
    return await Proxy("post","/form/delete/"+id, request);
}

export async function PublishForm(id,request) {
    
    return await Proxy("post","/form/publish/"+id, request);
}
  