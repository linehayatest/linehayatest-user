import useUserStateStore from "../stores/stateStore";
import useUserStore from "../stores/userStore";

function useResetUser() {
  const setUserId = useUserStore(state => state.setUserId)
  const setUserState = useUserStateStore(state => state.setUserState)

  return () => {
    setUserId(-1)
    setUserState("idling")
  }
}

export default useResetUser