import create from 'zustand'

type IsChatTabStore = {
  isChatTab: boolean,
  setIsChatTab: (s: boolean) => void,
}

// isChatTab initialized to false to prevent reconnection before checking
const useIsChatTabStore = create<IsChatTabStore>(
  set => ({
    isChatTab: true,
    setIsChatTab: (s) => set({ isChatTab: s }),
  })
)

export default useIsChatTabStore
export type { IsChatTabStore }