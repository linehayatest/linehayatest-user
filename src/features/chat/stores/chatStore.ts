import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Chat } from "../models/Chat"

type ChatStore = {
  chats: Chat[],
  addChat: (chat: Chat) => void,
  clearChats: () => void,
}

const useChatStore = create<ChatStore>(persist(
  set => ({
    chats: [],
    addChat: (chat) => set(state => ({ chats: [ ...state.chats, chat ]})),
    clearChats: () => set(_ => ({ chats: [] })),
  }),
  {
    name: 'chats'
  }
))

export default useChatStore
export type { ChatStore }