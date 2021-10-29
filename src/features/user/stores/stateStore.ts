import create from 'zustand'
import { persist } from "zustand/middleware"

import { userState } from "../models/states"

type UserStateStore = {
  userState: userState,
  setUserState: (state: userState) => void
}

const useUserStateStore = create<UserStateStore>(persist(
  (set, get) => ({
    userState: 'idling',
    setUserState: state => set({ userState: state }),
  }),
  {
    name: 'user-state',
  }
))

export type { UserStateStore }

export default useUserStateStore
