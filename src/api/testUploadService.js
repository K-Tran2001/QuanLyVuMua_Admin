import { Proxy } from "./Proxy";

export async function UploadMutli(request) {
    
    return await Proxy("post_multi","/upload-multiple", request);
}

export async function uploadCloudinaryMulti(request) {
    
    return await Proxy("post_multi","/upload-cloudinary-multiple", request);
}

export async function uploadImgurMulti(request) {
    
    return await Proxy("post_multi","/upload-imgur-multiple", request);
}