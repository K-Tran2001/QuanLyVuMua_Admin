import { FetchAPI } from "./FetchAPI";
import { Proxy } from "./Proxy";



export async function GetAllEvent(request) {
    
    return await Proxy("post","/event/get-all", request);
}


export async function SaveEvent(request) {
    
    return await Proxy("post","/event/create", request);
}
export async function SeachEvent(id,request) {
    
    return await Proxy("post","/event/search/"+id, request);
}

export async function UpdateEvent(id,request) {
    
    return await Proxy("post","/event/update/"+id, request);
}

export async function DeleteEvent(id,request) {
    
    return await Proxy("post","/event/delete/"+id, request);
}

export async function PushNotify(request) {
    
    return await FetchAPI("post",`${import.meta.env.VITE_BACKEND_FETCH_API}/push-fcm-token`, request);
}