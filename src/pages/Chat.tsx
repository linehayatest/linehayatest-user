import axios from 'axios'
import React, { useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'

import NavbarLayoutContainer from '@features/chat/containers/NavbarLayoutContainer'
import { REST_URL } from '@globals/urls'
import useUserStateStore from '@features/user/stores/stateStore'
import useUserStore from '@features/user/stores/userStore'
import useIsChatTabStore from '@features/user/stores/isChatTabStore'
import WaitingAreaCard from '@features/chat/components/WaitingAreaCard'
import useResetUser from '@features/user/hooks/useResetUser'
import ChatArea from '@features/chat/components/Chat'
import Feedback from '@features/chat/components/Feedback'

/*
if not chat tab, display "this is not chat tab"
if chatting: display Chat
if FinishChatting: Display form
otherwise, display waiting area cards
*/

// function useVerifyChatTab() {
//   const userId = useUserStore(state => state.userId)
//   const setIsChatTab = useIsChatTabStore(state => state.setIsChatTab)

//   useEffect(() => {
//     axios.get(`${REST_URL}/is_student_active_on_another_tab/${userId}`)
//     .then(data => {
//       const { isActive } = data.data
//       setIsChatTab(!isActive)
//     })
//   }, [])
// }

function useResetFinishAndWaitingState() {
  const userState = useUserStateStore(state => state.userState)
  const resetUser = useResetUser()

  useEffect(() => {
    if (userState === 'waiting' || userState === 'finish-chatting') {
      resetUser()
    }
  }, [])
}

function Content() {
  const { userState, setUserState } = useUserStateStore(state => ({
    userState: state.userState,
    setUserState: state.setUserState,
  }))

  switch(userState) {
    case 'chatting': {
      return <ChatArea />
    };
    case 'finish-chatting': {
      return <Feedback />
    };
    default: {
      return <WaitingAreaCard onLastCard={() => setUserState('waiting')} />
    }
  }
}

function Chat() {
  const isChatTab = useIsChatTabStore(state => state.isChatTab)

  // useVerifyChatTab()
  useResetFinishAndWaitingState()

  return (
    isChatTab ? (
      <NavbarLayoutContainer>
        <Content />
      </NavbarLayoutContainer>
    ) : (
      <Box>
        <Text>You have another tab making chat request open. Please close the tab first.</Text>
      </Box>
    )
  )
}

export default Chat