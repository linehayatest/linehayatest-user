import { useEffect } from "react";
import useUserStateStore from "../stores/stateStore";
import useResetUser from "./useResetUser";

function useResetUserOnload() {
  const { userState } = useUserStateStore(state => ({
    userState: state.userState,
  }))
  const resetUser = useResetUser()

  useEffect(() => {
    if (userState === "waiting") {
      resetUser()    
    }
  }, [])
}

export default useResetUserOnload