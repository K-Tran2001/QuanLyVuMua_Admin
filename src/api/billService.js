import { Proxy } from "./Proxy";



export async function GetAllBill(request) {
    
    return await Proxy("post","/bill/get-all", request);
}

export async function SaveBill(request) {
    
    return await Proxy("post","/bill/create", request);
}

export async function SaveBill_UploadMutli(request) {
    
    return await Proxy("post_multi","/bill/create-upload-multi", request);
}

export async function UpdateBill(id,request) {
    
    return await Proxy("post","/bill/update/"+id, request);
}

export async function UpdateBill_UploadMutli(id,request) {
    
    return await Proxy("post","/bill/update-upload-multi/"+id, request);
}

export async function SeachBill(id,request) {
    
    return await Proxy("post","/bill/search/"+id, request);
}

export async function DeleteBill(id,request) {
    
    return await Proxy("post","/bill/delete/"+id, request);
}

export async function ImportBill(request) {
    
    return await Proxy("post","/bill/import", request);
}
export async function ExportBill(request) {
    
    return await Proxy("post","/bill/export", request);
}

export async function ExportAllBill() {
    
    return await Proxy("post","/bill/export-all");
}
  