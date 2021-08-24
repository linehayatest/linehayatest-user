import { useEffect } from "react";
import { ChatMessage, ChatRequestReply, EVENTS, ServerEvent } from "../models/events";
import useWebSocketStore from "../stores/webSocketStore";
import useChatStore from "@features/chat/stores/chatStore";
import useUserStateStore from "@features/user/stores/stateStore";
import useUserStore from "@features/user/stores/userStore";
import { useToast } from "@chakra-ui/react";
import { useReconnectModalStore } from "../components/ReconnectModal";
import useResetUser from "@features/user/hooks/useResetUser";
import useReceivingStatusStore from "@features/chat/stores/receivingStatusStore";

function useHandleEvents() {
  const lastMessage = useWebSocketStore(state => state.lastMessage)
  const webSocket = useWebSocketStore(state => state.webSocket)
  const setUserState = useUserStateStore(state => state.setUserState)
  const setUserId = useUserStore(state => state.setUserId)
  const addChat = useChatStore(state => state.addChat)
  const toast = useToast()

  const setModalContent = useReconnectModalStore(state => state.setModalContent)
  const setIsOnline = useReceivingStatusStore(state => state.setIsOnline)

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
        setIsOnline(false)
        toast({
          description: "Volunteer has suddenly disconnect",
          status: "error",
        })
        break;
      }
      case EVENTS.PARTY_HAS_RECONNECT: {
        setIsOnline(true)
        toast({
          description: "Volunteer is back online",
          status: "success",
        })
        break;
      }
      case EVENTS.PARTY_HAS_END_CONVERSATION: {
        // PROBLEM: websocket closes first before modal content is set
        // reuse the reconnect modal, but show a different type of content
        setModalContent('volunteer-ended-conversation')
      }
    }
  }, [lastMessage])
}

export default useHandleEvents