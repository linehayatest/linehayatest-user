import useWebSocketStore from "../stores/webSocketStore";
import { REQUESTS, RequestCode, ChatRequest } from "@features/server/models/requests"

// check if another tab is waiting
// the check is to prevent case where:
// Student opens a tab in Idling
// Student opens another tab in Idling
// Student makes a request on the first tab (Waiting)
// Second tab doesn't know that first tab is now active, and would make the chat request
// Solution: Asking the server first, then update the isActive, 
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