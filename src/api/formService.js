import { Proxy } from "./Proxy";



export async function GetAllForm(request) {
    
    return await Proxy("post","/form/get-all", request);
}

export async function SaveForm(request) {
    
    return await Proxy("post","/form/create", request);
}
export async function SeachForm(request) {
    
    return await Proxy("post","/form/search", request);
}
  