import { Proxy } from "./Proxy";





export const ChatWithGemini = async (request) =>
  await Proxy("post", "/geminiChatBot", request, false);


