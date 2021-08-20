import useUserStore from "@features/user/stores/userStore"
import { ReconnectRequest } from "../models/requests"
import useWebSocketStore from "../stores/webSocketStore"

function useReconnect() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const userId = useUserStore(state => state.userId)

  return () => {
    if (sendMessage === null) {
      throw("Cannot send reconnect request, sendMessage is null")
    }
    const req: ReconnectRequest = {
      type: 5,
      metadata: {
        type: 'student',
        identity: JSON.stringify(userId),
      }
    }
    sendMessage(req)
  }
}

export default useReconnect