import useWebSocketStore from "../stores/webSocketStore";
import { REQUESTS, RequestCode, ChatRequest } from "@features/server/models/requests"

function useRequestChat() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const request: ChatRequest = { type: 4 }

  return () => {
    if (sendMessage === null) {
      throw("Unable to send chat message. sendMessage is null")
    }
    sendMessage(request)
  }
}

export default useRequestChat