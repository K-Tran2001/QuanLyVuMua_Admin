import { Proxy } from "./Proxy";


export async function Login(request) {
    
    return await Proxy("post","/login", request);
}

export async function SignUp(request) {
    
    return await Proxy("post","/signup", request);
}
  