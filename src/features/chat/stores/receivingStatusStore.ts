import create from 'zustand'
import { persist } from 'zustand/middleware'

type ReceivingStatusStore = {
  isOnline: boolean,
  setIsOnline: (s: boolean) => void,
}

const useReceivingStatusStore = create<ReceivingStatusStore>(persist(
  set => ({
    isOnline: true,
    setIsOnline: (s) => set({ isOnline: s }),
  }),
  {
    name: 'receivingStatus'
  }
))

export default useReceivingStatusStore
export type { ReceivingStatusStore }