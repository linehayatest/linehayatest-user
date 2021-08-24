import { useEffect, useState } from "react"

import useUserStateStore from "@features/user/stores/stateStore"
import useUserStore from "@features/user/stores/userStore"
import useWebSocketStore from "../stores/webSocketStore"
import ReadyState from "../models/readyState"
import axios from "axios"
import { REST_URL } from "@globals/urls"
import useSetupWebSocket from "./useSetupWebSocket"
import useReconnect from "./useReconnect"
import useRequestChat from "./useRequestChat"
import useResetUser from "@features/user/hooks/useResetUser"
import { useReconnectModalStore } from "../components/ReconnectModal"
import useIsChatTabStore from "@features/user/stores/isChatTabStore"


// useInitServer initializes WebSocket connection based on these conditions:
// 1. If last session is still active, check with server if can reconnect
// 2. If can, Initialize WebSocket connection and send a Reconnect request
// 3. Otherwise, reset user
function useInitServer() {
  const { webSocket, readyState, sendMessage } = useWebSocketStore(state => ({
    readyState: state.readyState,
    sendMessage: state.sendMessage,
    webSocket: state.webSocket,
  }))
  const userId = useUserStore(state => state.userId)
  const userState = useUserStateStore(state => state.userState)
  const setupWebSocket = useSetupWebSocket({
    onClose: (e) => {},
    onMessage: (e) => {},
  })
  const [canReconnect, setCanReconnect] = useState(false)
  const reconnect = useReconnect()
  const requestChat = useRequestChat()
  const resetUser = useResetUser()

  const { onModalOpen, setModalContent, modalContent } = useReconnectModalStore(state => ({
    onModalOpen: state.onOpen,
    setModalContent: state.setModalContent,
    modalContent: state.modalContent
  }))

  const { isChatTab, setIsChatTab } = useIsChatTabStore(state => ({
    isChatTab: state.isChatTab,
    setIsChatTab: state.setIsChatTab,
  }))

  useEffect(() => {
    // when volunteer close connection: this will react
    // this effect is supposed to run when student logs into the website (e.g)
    // after a refresh

    // User is in chat-active
    // if user is chatting but socket is closed, ask server if can reconnect
    // But before attempting Reconnect, ask server if there is another Student with same user id
    // but already in "Chat-Active" or "Waiting" state
    // meaning before open this tab, Student already opens another tab with Socket connection open

    // TODO: Also handles the case where user is Waiting and open another tab
    // If user is in "Waiting" state but socket connection is closed, ask server if there is another
    // Student in "Waiting" or Chat-Active state, if yes, this is secondary tab
    if (userState === "chatting" && userId !== -1 && readyState === ReadyState.CLOSED || readyState === ReadyState.CLOSING) {
      // ModalContent != volunteer-ended-conversation is used to check if volunteer just ended conversation
      // if volunteer just ended conversation, then even though we're still chatting but socket is closed
      // we don't want to reconnect, instead, we want to close the WebSocket connection

      // Question: Is this needed? This is needed because useHandleEvents cannot close WebSocket
      // That's why socket needs to be closed here. If `useHandleEvents` close WebSocket, 

      // Question 2: Can we resetUser in useHandleEvents? Cannot. Because we need to transition `chat` to `finish-chat`
      // We cannot transition from `chat` to `idling` to `finish-chat`
      if (modalContent !== "volunteer-ended-conversation") {
        // if student is active on another tab, we don't want to reconnect
        axios.get(`${REST_URL}/is_student_active_on_another_tab/${userId}`)
          .then(data => {
            const { isActive } = data.data
            setIsChatTab(!isActive)
            if (!isActive) {
              axios.get(`${REST_URL}/can_student_reconnect/${userId}`)
              .then(data => {
                const { canReconnect } = data.data
                setCanReconnect(canReconnect)
                setModalContent(canReconnect ? 'last-session-active': 'last-session-ended')
                if (!canReconnect) {
                  resetUser()
                }
              })
              onModalOpen()
            }
          })
      } else {
        webSocket?.close()
        resetUser()
        onModalOpen()
      }
    }
      
  }, [readyState, userState, userId])

  // if server reply that session is still active, reconnect
  useEffect(() => {
    if (canReconnect && readyState === ReadyState.OPEN && sendMessage !== null) {
      reconnect()
    }
  }, [readyState, sendMessage, canReconnect])

  // connect to server and request to chat after student transition to "WAIT" state
  useEffect(() => {
    if (userState === "waiting") {
      axios.get(`${REST_URL}/is_student_active_on_another_tab/${userId}`)
        .then(data => {
          const { isActive } = data.data
          setIsChatTab(!isActive)
          if (!isActive) {
            // setup websocket when student request to chat
            if (readyState === ReadyState.CLOSED || readyState === ReadyState.CLOSING) {
              setModalContent("last-session-ended")
              setupWebSocket()
            }

            // request to chat once connection is open
            if (readyState === ReadyState.OPEN && sendMessage !== null) {
              requestChat()
            }
          }
        })
    }
  }, [readyState, userState, sendMessage])

  // if student is idling, yet connection is still open, closes the connection
  useEffect(() => {
    if (userState === "idling" && readyState === ReadyState.OPEN || readyState === ReadyState.CONNECTING) {
      webSocket?.close()
    }
  }, [readyState, userState])
}

export default useInitServer