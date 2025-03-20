import { Proxy } from "./Proxy";


export async function Login(request) {
    
    return await Proxy("post","/login", request,false);
}

export async function SignUp(request) {
    
    return await Proxy("post","/signup", request,false);
}
  