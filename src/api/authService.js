import { Proxy } from "./Proxy";


export async function Login(request) {
    
    return await Proxy("post","/login", request,false);
}

export async function SignUp(request) {
    
    return await Proxy("post","/signup", request,false);
}

export async function UpdateUserProfile(id,request) {
    
    return await Proxy("post_multi","/update-user-profile/"+id, request,false);
}

export async function SeachUserProfiles(id,request) {
    
    return await Proxy("post","/search-profile/"+id, request,false);
}
  