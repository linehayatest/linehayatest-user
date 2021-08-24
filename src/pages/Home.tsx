import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react"

import history from "@globals/history"
import useUserStateStore from "@features/user/stores/stateStore";
import useIsChatTabStore from "@features/user/stores/isChatTabStore";

function useHandleChatRequest() {
  const setUserState = useUserStateStore(state => state.setUserState)

  return () => {
    history.push("/chat")
  }
}

function Home() {

  const handleChatRequest = useHandleChatRequest()
  const isChatTab = useIsChatTabStore(state => state.isChatTab)

  return (
    <>
      <Box py="20">
        <Text textAlign="center">LineHayat Home page</Text>
      </Box>

      <HStack justifyContent="center" spacing="8" mb="8">
        <Button
          w={20}
          onClick={() => console.log('calling')}
        >
          Call
        </Button>
        <Button
          w={20}
          onClick={handleChatRequest}
          disabled={!isChatTab}
        >
          Chat
        </Button>
      </HStack>      
    </>
    
  )
}

export default Home