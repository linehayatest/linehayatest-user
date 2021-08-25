import create from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'
import { Chat } from "../models/Chat"
import localforage from "localforage";

type ChatStore = {
  chats: Chat[],
  addChat: (chat: Chat) => void,
  clearChats: () => void,
}

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return localforage.getItem(name) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    localforage.setItem(name, value)
  }
}

const useChatStore = create<ChatStore>(persist(
  set => ({
    chats: [],
    addChat: (chat) => set(state => ({ chats: [ ...state.chats, chat ]})),
    clearChats: () => set(_ => ({ chats: [] })),
  }),
  {
    name: 'chats',
    getStorage: () => storage,
  }
))

export default useChatStore
export type { ChatStore }