import create from 'zustand'

import ReadyState, { readyState } from "@features/server/models/readyState"

type WebSocketStore = {
  webSocket: WebSocket | null,
  sendMessage: null | ((message: any) => void),
  lastMessage: any,
  readyState: readyState,
  setWebSocket: (s: WebSocket) => void,
  setSendMessage: (send: (message: any) => void) => void,
  setLastMessage: (message: any) => void,
  setReadyState: (s: readyState) => void,
}

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  webSocket: null,
  sendMessage: null,
  lastMessage: {},
  readyState: ReadyState.CLOSED,
  setWebSocket: (s) => set(_state => ({ webSocket: s })),
  setSendMessage: (send) => set(_state => ({ sendMessage: send })),
  setLastMessage: (message) => set(_state => ({ lastMessage: message })),
  setReadyState: (s) => set(_state => ({ readyState: s })),
}))

export type { WebSocketStore }

export default useWebSocketStore