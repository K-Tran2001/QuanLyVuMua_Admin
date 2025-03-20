import { Proxy } from "./Proxy";



export async function GetAllPartner(request) {
    
    return await Proxy("post","/partner/get-all", request);
}

export async function SavePartner(request) {
    
    return await Proxy("post","/partner/create", request);
}

export async function SavePartner_UploadMutli(request) {
    
    return await Proxy("post_multi","/partner/create-upload-multi", request);
}

export async function UpdatePartner(id,request) {
    
    return await Proxy("post","/partner/update/"+id, request);
}

export async function UpdatePartner_UploadMutli(id,request) {
    
    return await Proxy("post","/partner/update-upload-multi/"+id, request);
}

export async function SeachPartner(id,request) {
    
    return await Proxy("post","/partner/search/"+id, request);
}

export async function DeletePartner(id,request) {
    
    return await Proxy("post","/partner/delete/"+id, request);
}

export async function ImportPartner(request) {
    
    return await Proxy("post","/partner/import", request);
}
export async function ExportPartner(request) {
    
    return await Proxy("post","/partner/export", request);
}

export async function ExportAllPartner() {
    
    return await Proxy("post","/partner/export-all");
}
  