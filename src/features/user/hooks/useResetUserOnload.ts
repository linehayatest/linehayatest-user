import { useEffect } from "react";
import axios from "axios"

import useUserStateStore from "../stores/stateStore";
import useResetUser from "./useResetUser";
import { REST_URL } from "@globals/urls"
import useUserStore from "../stores/userStore";

function useResetUserOnload() {
  const { userState } = useUserStateStore(state => ({
    userState: state.userState,
  }))
  const resetUser = useResetUser()
  const userId = useUserStore(state => state.userId)

  useEffect(() => {
    axios.get(`${REST_URL}/is_student_active_on_another_tab/${userId}`)
      .then(data => {
        const { isActive } = data.data
        if (!isActive && userState === "waiting") {
          resetUser()    
        }
      })
  }, [])
}

export default useResetUserOnload