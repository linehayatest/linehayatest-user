import create from 'zustand'
import { persist } from "zustand/middleware"

type UserStore = {
  userId: number,
  setUserId: (s: number) => void
}

const useUserStore = create<UserStore>(persist(
  (set, get) => ({
    userId: -1,
    setUserId: (s: number) => set(_state => ({ userId: s }))
  }),
  {
    name: 'userId',
  }
))

export type { UserStore }

export default useUserStore
