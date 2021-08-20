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

  useEffect(() => {
    // when volunteer close connection: this will react
    // this effect is supposed to run when student logs into the website (e.g)
    // after a refresh
    if (userState === "chatting" && userId !== -1 && readyState === ReadyState.CLOSED || readyState === ReadyState.CLOSING) {
      axios.get(`${REST_URL}/can_student_reconnect/${userId}`)
        .then(data => {
          const { canReconnect } = data.data
          setCanReconnect(canReconnect)
          if (canReconnect) {
            setupWebSocket()
          } else {
            // cannot reconnect (resetted connection)
            // show a modal: Volunteer has closes connection
            // question: How to differentiate
              // Volunteer End Conversation while chatting vs
              // Student Disconnect then comes back up and Connection already closed
            // current condition: If user is chatting and but Socket is already closed
            // setTimeout
            // if volunteer end conversation, there will be a notification from server
            // if no notification, then student comes back up
            resetUser()
          }
        })
    }
  }, [readyState, userState, userId])

  useEffect(() => {
    if (canReconnect && readyState === ReadyState.OPEN && sendMessage !== null) {
      reconnect()
    }
  }, [readyState, sendMessage, canReconnect])

  useEffect(() => {
    if (userState === "waiting") {
      if (readyState === ReadyState.CLOSED || readyState === ReadyState.CLOSING) {
        setupWebSocket()
      }

      if (readyState === ReadyState.OPEN && sendMessage !== null) {
        requestChat()
      }
    }
  }, [readyState, userState, sendMessage])

  useEffect(() => {
    if (userState === "idling" && readyState === ReadyState.OPEN || readyState === ReadyState.CONNECTING) {
      webSocket?.close()
    }
  }, [readyState, userState])
}

export default useInitServer