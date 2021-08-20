import useUserStore from "@features/user/stores/userStore";
import useResetUser from "@features/user/hooks/useResetUser";
import { EndConversationRequest } from "../models/requests";
import useWebSocketStore from "../stores/webSocketStore";

function useEndConversation() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const userId = useUserStore(state => state.userId)

  return () => {
    const message: EndConversationRequest = {
      metadata: {
        identity: JSON.stringify(userId),
        type: 'student'
      },
      type: 7,
    }

    if (sendMessage === null) {
      throw("Unable to send chat message. sendMessage is null")
    }

    sendMessage(message)
  }
}

export default useEndConversation