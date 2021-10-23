import React from "react";
import { Box, Button, HStack, Text, Tooltip } from "@chakra-ui/react"
import Peer from "peerjs";

import history from "@globals/history"
import useIsChatTabStore from "@features/user/stores/isChatTabStore";

function useHandleChatRequest() {
  return () => {
    history.push("/chat")
  }
}

function useHandleCallRequest() {
  return () => history.push('/call')
}

function Home() {

  const handleChatRequest = useHandleChatRequest()
  const handleCallRequest = useHandleCallRequest()
  const isChatTab = useIsChatTabStore(state => state.isChatTab)


  return (
    <>
      <Box py="20">
        <Text textAlign="center">LineHayat Home page</Text>
      </Box>

      <HStack justifyContent="center" spacing="8" mb="8">
        <Tooltip hasArrow label="Calling is not available yet" shouldWrapChildren>
          <Button
            isDisabled
            w={20}
            onClick={() => {
              handleCallRequest()
            }}
          >
            Call
          </Button>
        </Tooltip>
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