import { useEffect } from "react"

import ReadyState, { readyState } from "@features/server/models/readyState"
import useWebSocketStore from '../stores/webSocketStore';
import { SOCKET_URL } from '@globals/urls'

type setupWebSocket = () => void
type useSetupWebSocketProps = {
  onClose: (e: CloseEvent) => void,
  onMessage: (e: MessageEvent<any>) => void,
}

function useSetupWebSocket({ onClose, onMessage }: useSetupWebSocketProps): setupWebSocket {
  const {
    setWebSocket,
    setSendMessage,
    setLastMessage,
    setReadyState,
  } = useWebSocketStore(state => ({
    setWebSocket: state.setWebSocket,
    setSendMessage: state.setSendMessage,
    setLastMessage: state.setLastMessage,
    setReadyState: state.setReadyState,
    readyState: state.readyState,
  }))

  return () => {
    const s = new WebSocket(SOCKET_URL)

    s.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      setLastMessage(msg)
      onMessage(e)
      console.log("YOU GOT MAIL")
      console.log(e.data)
    }
    s.onclose = (e) => {
      setReadyState(ReadyState.CLOSED)
      onClose(e)
      console.log("SOCKET CLOSED")
    }
    s.onopen = (e) => {
      setReadyState(ReadyState.OPEN)
      setWebSocket(s)
      setSendMessage(
        (data: any) => s.send(JSON.stringify(data))
      )
      console.log("SOCKET OPEN")
    }
  }
}

export default useSetupWebSocket