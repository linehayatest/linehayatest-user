import React, { useState, useRef } from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, VStack, HStack, Text, Input, IconButton, Button } from "@chakra-ui/react"
import { MdSend } from "react-icons/md";

import MobileMenu from './MobileMenu';
import useChatStore from '@features/chat/stores/chatStore';
import useSendChat from '@features/server/hooks/useSendChat';
import useEndConversation from '@features/server/hooks/useEndConversation';
import useResetUser from '@features/user/hooks/useResetUser';
import useUserStateStore from '@features/user/stores/stateStore';


const patternStyle = {
  bgColor: "#f7fafc",
  bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23cbd5e0' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E")`,
}

function Chat() {
  const [text, setText] = useState('')
  const { chats, addChat } = useChatStore(state => ({
    chats: state.chats,
    addChat: state.addChat,
  }))
  const inputRef = useRef<null|HTMLInputElement>(null)
  const sendChat = useSendChat()
  const endConversation = useEndConversation()
  const resetUser = useResetUser()
  const setUserState = useUserStateStore(state => state.setUserState)

  const handleSendChat = () => {
    if (inputRef.current !== null) {
      inputRef.current.value = ''
    }
    addChat({
      fromSelf: true,
      message: text,
      time: new Date()
    })
    sendChat(text)
    setText('')
  }

  const handleEndConversation = () => {
    // TODO: 1. reset user, show feedback modal
    resetUser()
    endConversation()
    setUserState('finish-chatting')
  }

  const isOpen = false

  return (
    <Box w="full" h="100vh" {...patternStyle} position="relative">
      <HStack justifyContent="space-between" w="full" bgColor="white" px="2" py="2">
        <Box borderRadius="50%" h="2" w="2" mx="2" bgColor="green.400"></Box>
        <Text>Listening Carer</Text>
        <Button
          onClick={handleEndConversation}
          size="sm"
          colorScheme="red">
            End conversation
        </Button>
      </HStack>

      <VStack h="84%" spacing="2" alignItems="normal" overflowY="auto" pt="1">
        {
          chats.map(chat => (
            <Box key={new Date(chat.time).toISOString()} maxW="80%" alignSelf={chat.fromSelf ? "flex-end" : "flex-start"} bgColor="white" px="3" py="1" rounded="md" boxShadow="sm">
              <Text>
                {chat.message}
              </Text>
            </Box>
        
          ))
        }
      </VStack>

      <HStack h="calc(100% - 84% - 48px)" pb="1" px="2">
        <Input
          w="85%"
          borderRadius="200px"
          boxShadow="md"
          variant="filled" placeholder="Filled"
          bgColor="white"
          _focus={{bgColor: "white"}}
          flexGrow={1}
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton
          ml="1" p="2"
          colorScheme="whatsapp"
          aria-label="Send message"
          borderRadius="50%"
          as={MdSend}
          onClick={handleSendChat}
        />
      </HStack>

      <Box
        position="absolute"
        left="0" top="0"
        w="full" h="full"
        bgColor="white"
        display={[
            isOpen ? "block" : "none",
            isOpen ? "block" : "none",
            "none"
        ]}
        zIndex={1}
      >
        <MobileMenu />
      </Box>
    </Box>
  )
}

export default Chat