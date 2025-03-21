import { Proxy } from "./Proxy";


export async function GetRevenue12Month(request) {
    
    return await Proxy("post","/dashboard-block-1", request,false);
}

export async function GetBillDataWithAllType(request) {
    
    return await Proxy("post","/dashboard-block-2", request,false);
}
export async function GetPendingBills(request) {
    
    return await Proxy("post","/dashboard-block-3", request,false);
}
  