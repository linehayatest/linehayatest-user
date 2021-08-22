import useChatStore from "@features/chat/stores/chatStore";
import useReceivingStatusStore from "@features/chat/stores/receivingStatusStore";
import useUserStateStore from "../stores/stateStore";
import useUserStore from "../stores/userStore";

function useResetUser() {
  const setUserId = useUserStore(state => state.setUserId)
  const setUserState = useUserStateStore(state => state.setUserState)
  const clearChats = useChatStore(state => state.clearChats)
  const setIsOnline = useReceivingStatusStore(state => state.setIsOnline)

  return () => {
    setUserId(-1)
    setUserState("idling")
    clearChats()
    setIsOnline(true)
  }
}

export default useResetUser