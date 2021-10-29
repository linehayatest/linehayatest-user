import create from 'zustand'
import { persist } from "zustand/middleware"

type UserStore = {
  userId: number,
  setUserId: (state: number) => void,
}

const useUserStore = create<UserStore>(persist(
  (set, get) => ({
    userId: -1,
    setUserId: (state: number) => set({ userId: state }),
  }),
  {
    name: 'userId',
  }
))

export type { UserStore }

export default useUserStore