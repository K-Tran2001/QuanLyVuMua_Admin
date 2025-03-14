import { FetchAPI } from "./FetchAPI";

export async function Translate(request) {
    
    return await FetchAPI("post","https://script.google.com/macros/s/AKfycbzEz6oXfIilm0F9SiUfOLrtApG13F8UYYzKvudDpIVdVkhCDBPf_WaBXwwGLMFyY79j/exec", request);
}
  