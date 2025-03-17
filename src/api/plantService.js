import { Proxy } from "./Proxy";



export async function GetAllPlant(request) {
    
    return await Proxy("post","/plant/get-all", request);
}

export async function SavePlant(request) {
    
    return await Proxy("post","/plant/create", request);
}

export async function SavePlant_UploadMutli(request) {
    
    return await Proxy("post_multi","/plant/create-upload-multi", request);
}

export async function UpdatePlant(id,request) {
    
    return await Proxy("post","/plant/update/"+id, request);
}

export async function UpdatePlant_UploadMutli(id,request) {
    
    return await Proxy("post","/plant/update-upload-multi/"+id, request);
}

export async function SeachPlant(id,request) {
    
    return await Proxy("post","/plant/search/"+id, request);
}

export async function DeletePlant(id,request) {
    
    return await Proxy("post","/plant/delete/"+id, request);
}

export async function ImportPlant(request) {
    
    return await Proxy("post","/plant/import", request);
}
export async function ExportPlant(request) {
    
    return await Proxy("post","/plant/export", request);
}

export async function ExportAllPlant() {
    
    return await Proxy("post","/plant/export-all");
}
  