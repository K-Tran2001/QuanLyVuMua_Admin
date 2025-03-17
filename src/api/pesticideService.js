import { Proxy } from "./Proxy";



export async function GetAllPesticide(request) {
    
    return await Proxy("post","/pesticide/get-all", request);
}

export async function SavePesticide(request) {
    
    return await Proxy("post","/pesticide/create", request);
}

export async function SavePesticide_UploadMutli(request) {
    
    return await Proxy("post_multi","/pesticide/create-upload-multi", request);
}

export async function UpdatePesticide(id,request) {
    
    return await Proxy("post","/pesticide/update/"+id, request);
}

export async function UpdatePesticide_UploadMutli(id,request) {
    
    return await Proxy("post","/pesticide/update-upload-multi/"+id, request);
}

export async function SeachPesticide(id,request) {
    
    return await Proxy("post","/pesticide/search/"+id, request);
}

export async function DeletePesticide(id,request) {
    
    return await Proxy("post","/pesticide/delete/"+id, request);
}

export async function ImportPesticide(request) {
    
    return await Proxy("post","/pesticide/import", request);
}
export async function ExportPesticide(request) {
    
    return await Proxy("post","/pesticide/export", request);
}

export async function ExportAllPesticide() {
    
    return await Proxy("post","/pesticide/export-all");
}
  