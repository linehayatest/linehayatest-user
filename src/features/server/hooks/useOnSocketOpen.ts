import { useEffect } from "react"

import ReadyState from "../models/readyState"
import useWebSocketStore from "../stores/webSocketStore"

function useOnSocketOpen(onOpen: () => void) {
  const {readyState, sendMessage} = useWebSocketStore(state => ({
    readyState: state.readyState,
    sendMessage: state.sendMessage,
  }))

  useEffect(() => {
    if (readyState === ReadyState.OPEN && sendMessage !== null) {
      onOpen()
    }
  }, [readyState, sendMessage])
}

export default useOnSocketOpen