import create from 'zustand'
import { Chat } from "../models/Chat"

type ChatStore = {
  chats: Chat[],
  addChat: (chat: Chat) => void
}

const useChatStore = create<ChatStore>(set => ({
  chats: [],
  addChat: (chat) => set(state => ({ chats: [ ...state.chats, chat ]}))
}))

export default useChatStore
export type { ChatStore }