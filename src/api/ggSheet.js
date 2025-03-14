import { FetchAPI } from "./FetchAPI";



export async function createGoogleSheet(request) {
    return await FetchAPI("post",import.meta.env.VITE_GG_SHEET_URL, request);
}
export async function addDataGoogleSheet(request) {
    return await FetchAPI("post",import.meta.env.VITE_GG_SHEET_URL, request);
}





export async function testRequest(request) {
    return await FetchAPI("post",import.meta.env.VITE_TEST_API, request);
}
  