import { Proxy } from "./Proxy";



export async function GetAllGarden(request) {
    
    return await Proxy("post","/garden/get-all", request);
}

export async function GetAllGardenFK(request) {
    
    return await Proxy("post","/garden/get-all-fk", request);
}

export async function SaveGarden(request) {
    
    return await Proxy("post","/garden/create", request);
}

export async function SaveGarden_UploadMutli(request) {
    
    return await Proxy("post_multi","/garden/create-upload-multi", request);
}

export async function UpdateGarden(id,request) {
    
    return await Proxy("post","/garden/update/"+id, request);
}

export async function UpdateGarden_UploadMutli(id,request) {
    
    return await Proxy("post","/garden/update-upload-multi/"+id, request);
}

export async function SeachGarden(id,request) {
    
    return await Proxy("post","/garden/search/"+id, request);
}

export async function DeleteGarden(id,request) {
    
    return await Proxy("post","/garden/delete/"+id, request);
}

export async function ImportGarden(request) {
    
    return await Proxy("post","/garden/import", request);
}
export async function ExportGarden(request) {
    
    return await Proxy("post","/garden/export", request);
}

export async function ExportAllGarden() {
    
    return await Proxy("post","/garden/export-all");
}
  