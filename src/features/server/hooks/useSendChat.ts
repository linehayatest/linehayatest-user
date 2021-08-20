import useUserStore from "@features/user/stores/userStore";
import { ChatMessage } from "../models/requests";
import useWebSocketStore from "../stores/webSocketStore";

function useSendChat() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const userId = useUserStore(state => state.userId)

  return (text: string) => {
    const message: ChatMessage = {
      metadata: {
        identity: JSON.stringify(userId),
        type: 'student'
      },
      type: 6,
      payload: {
        message: text,
      }
    }

    if (sendMessage === null) {
      throw("Unable to send chat message. sendMessage is null")
    }

    sendMessage(message)
  }
}

export default useSendChat