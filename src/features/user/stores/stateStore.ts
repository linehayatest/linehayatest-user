import create from 'zustand'
import { persist } from "zustand/middleware"

import { userState } from "../models/states"

type UserStateStore = {
  userState: userState,
  setUserState: (s: userState) => void
}

const useUserStateStore = create<UserStateStore>(persist(
  (set, get) => ({
    userState: 'idling',
    setUserState: (s) => set(_state => ({ userState: s }))
  }),
  {
    name: 'user-state'
  })
)

export type { UserStateStore }

export default useUserStateStore
