import create from 'zustand'

type IsChatTabStore = {
  isChatTab: boolean,
  setIsChatTab: (state: boolean) => void,
}

// isChatTab initialized to false to prevent reconnection before checking
const useIsChatTabStore = create<IsChatTabStore>(set => ({
  isChatTab: true,
  setIsChatTab: state => set({ isChatTab: state }),
}))

export default useIsChatTabStore
export type { IsChatTabStore }