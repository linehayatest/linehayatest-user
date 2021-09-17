import React, { useEffect } from "react"

import { CallRequest } from "@features/server/models/requests"
import useUserStateStore from "@features/user/stores/stateStore"
import useSetupWebSocket from "@features/call/hooks/useSetupWebSocket"
import useWebSocketStore from "@features/call/stores/socketStore"
import ReadyState from "@features/server/models/readyState"
import usePeerIdStore from "../stores/peerIdStore"

function useRequestCall() {
  const setUserState = useUserStateStore(state => state.setUserState)
  const userState = useUserStateStore(state => state.userState)
  const peerId = usePeerIdStore(state => state.peerId)
  const {
    send,
    readyState,
  } = useWebSocketStore(state => ({
    webSocket: state.webSocket,
    send: state.sendMessage,
    readyState: state.readyState,
  }))

  const setupWebSocket = useSetupWebSocket({
    onClose: () => {},
    onMessage: () => {},
  })

  // return a function that setups socket connection
  // useEffect -> once connection setup, send a call request message with peer id
  // and set user state also
  useEffect(() => {
    if (send !== null && userState === 'waiting-call') {
      const req: CallRequest = {
        type: 8,
        payload: { peerId }
      }
      console.log(send)
      send(req)
    }
  }, [send, userState])

  return () => {
    setupWebSocket()
    setUserState('waiting-call')
  }
}

export default useRequestCall