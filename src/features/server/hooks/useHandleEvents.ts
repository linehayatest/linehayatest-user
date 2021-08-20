import { useEffect } from "react";
import { ChatMessage, ChatRequestReply, EVENTS, ServerEvent } from "../models/events";
import useWebSocketStore from "../stores/webSocketStore";
import useChatStore from "@features/chat/stores/chatStore";
import useUserStateStore from "@features/user/stores/stateStore";
import useUserStore from "@features/user/stores/userStore";
import { useToast } from "@chakra-ui/react";

function useHandleEvents() {
  const lastMessage = useWebSocketStore(state => state.lastMessage)
  const setUserState = useUserStateStore(state => state.setUserState)
  const setUserId = useUserStore(state => state.setUserId)
  const addChat = useChatStore(state => state.addChat)
  const toast = useToast()

  useEffect(() => {
    const type = lastMessage.type as ServerEvent

    switch (type) {
      case EVENTS.CHAT_MESSAGE: {
        const { message } = lastMessage as ChatMessage
        addChat({
          time: new Date(),
          fromSelf: false,
          message
        })
        break;
      };
      case EVENTS.CHAT_REQUEST_REPLY: {
        const { userId } = lastMessage as ChatRequestReply
        setUserId(userId)
        break;
      }
      case EVENTS.CHAT_REQUEST_ACCEPTED: {
        setUserState('chatting')
        break;
      }
      case EVENTS.PARTY_HAS_DISCONNECT: {
        toast({
          description: "Volunteer has suddenly disconnect",
          status: "error",
        })
        break;
      }
      case EVENTS.PARTY_HAS_RECONNECT: {
        toast({
          description: "Volunteer is back online",
          status: "success",
        })
        break;
      }
    }
  }, [lastMessage])
}

export default useHandleEvents