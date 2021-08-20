import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react"

import Chat from "@features/chat/containers/Chat"
import useUserStateStore from "@features/user/stores/stateStore";
import { userState } from "@features/user/models/states";
import Test from "@pages/Test"

function switchChatContent(state: userState) {
  switch (state) {
    case 'idling': {
      return (
        <Test />
      )
    }
    case 'waiting': {
      return (
        <HStack px="8" h="full" justifyContent="center" alignItems="center">
          <Text textAlign="center">
            Please wait awhile before our team pick up your request
          </Text>
        </HStack>
      )
    }
    case 'chatting': {
      return (
        <Chat />
      )
    }
  }
}

export default function ChatPage() {
  const studentState = useUserStateStore(state => state.userState)
  
  return (
    <Box h="100vh">
      {switchChatContent(studentState)}
    </Box>
  )
}
