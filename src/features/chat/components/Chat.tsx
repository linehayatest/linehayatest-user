import React, { useEffect, useState, useRef } from "react"
import { Box, Text, Textarea, VStack, HStack, IconButton, Button } from "@chakra-ui/react"
import { useInViewport } from 'react-in-viewport';
import { MdSend } from "react-icons/md";

import useSendChat from "@features/server/hooks/useSendChat";
import useEndConversation from "@features/server/hooks/useEndConversation";
import useResetUser from "@features/user/hooks/useResetUser";
import useUserStateStore from "@features/user/stores/stateStore";
import useChatStore from "../stores/chatStore";
import { Chat } from '../models/Chat'


type ChatBubbleProps = {
  chat: Chat,
  keyStr: string,
}
function ChatBubble({ chat, keyStr }: ChatBubbleProps) {
  const bubbleRef = useRef<null|HTMLDivElement>(null)
  const textRef = useRef<null|HTMLParagraphElement>(null)
  const {
    inViewport,
    enterCount,
    leaveCount,
  } = useInViewport(
    bubbleRef,
    {},
    { disconnectOnLeave: false },
    {

    },
  );

  const time = new Date(chat.time)

  return (
    <Box
      ref={bubbleRef}
      minH={enterCount > 0 ? "auto" : "200px"}
      maxW="80%"
      alignSelf={chat.fromSelf ? "flex-end" : "flex-start"}
      mb="4"
    >
      <Text
        fontWeight="600"
        textAlign={chat.fromSelf ? "right" : "left"}
        fontFamily="Print Clearly"
        fontSize="1em">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Text>
      <Box
        key={keyStr}
        rounded="md"
        w="100%"
        backgroundColor={chat.fromSelf ? "#E5EAEE" : "white"}
        px="16px" py="8px"
        fontWeight="600"
        fontSize="1.25em"
        fontFamily="Print Clearly"
      >
        {
          inViewport ? (
            <Text 
              whiteSpace="pre-wrap"
              ref={textRef}>{chat.message}</Text>
          ) : null
        }
      </Box>
    </Box>
  )
}

function EndConversationButton() {
  const endConversation = useEndConversation()
  const resetUser = useResetUser()
  const setUserState = useUserStateStore(state => state.setUserState)

  const handleClick = () => {
    resetUser()
    endConversation()
    setUserState('finish-chatting')    
  }

  return (
    <Button
      px="4"
      size="xs"
      colorScheme="red"
      borderRadius="100px"
      onClick={handleClick}
      boxShadow="md"
    >
      End Conversation
    </Button>
  )
}


function ChatArea() {
  const { chats, addChat, clearChats } = useChatStore(state => ({
    chats: state.chats,
    addChat: state.addChat,
    clearChats: state.clearChats,
  }))
  const sendChat = useSendChat()

  const [text, setText] = useState("")
  const inputRef = useRef<null|HTMLTextAreaElement>(null)
  const chatListRef = useRef<null|HTMLDivElement>(null)

  useEffect(() => {
    chatListRef.current?.scrollTo(0, chatListRef.current?.scrollHeight)
  }, [chats]);

  const handleSubmit = React.useCallback(() => {
      if (text != "") {
        addChat({
          message: text,
          fromSelf: true,
          time: new Date()
        })
        sendChat(text)
        setText('')
        inputRef.current!.value = ""
      }
  }, [inputRef, chatListRef, text])

  useEffect(() => {
    const handleShiftEnterKeyDown = function(e: any) {
      if (e.key === "Enter" && e.shiftKey) { 
        e.preventDefault()
        setText(text + "\n")
        inputRef.current!.innerText += "\n"
      } else if (e.key === "Enter" && text != "") {
        e.preventDefault()
        addChat({
          message: text,
          fromSelf: true,
          time: new Date()
        })
        sendChat(text)
        setText('')
        inputRef.current!.value = ""
      }
    }

    document.addEventListener('keydown', handleShiftEnterKeyDown)

    return () => {
      document.removeEventListener('keydown', handleShiftEnterKeyDown)
    }
  }, [text, inputRef, sendChat])

  return (
    <Box display="flex" flexDirection="column" w="100%" h={["100%", "550px"]} bgColor="#CFDED7" rounded="xl" boxShadow="xl">
      <HStack justifyContent="space-between" px="4" py="2" borderBottom="1px solid white">
        <HStack>
          <Box w="20px" h="20px" bgColor="#49CA85" borderRadius="50%"></Box>
          <Text fontSize="1.5em" fontFamily="Print Clearly" fontWeight="600">Listening Volunteer</Text>
        </HStack>
        <EndConversationButton />
      </HStack>
      <VStack flexGrow={1} overflowY="auto" maxHeight="calc(100vh - 11.5rem - 101px)" ref={chatListRef} px="2" spacing={1}>
        {
          chats.map((chat, i) => (
            <ChatBubble chat={chat} keyStr={JSON.stringify(i)} />
          ))
        }
      </VStack>

      <HStack h={["100px", "100px"]}
        rounded="xl"
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
        bgColor="#E5EAEE"  boxShadow="xl"
      >
        <Textarea
          variant="filled"
          w={["88%", "90%"]} h="full"
          rounded="xl"
          borderTopLeftRadius="0"
          borderTopRightRadius="0"
          bgColor="#E5EAEE"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fontFamily="Print Clearly"
          fontSize="1.25em"
          fontWeight="600"
          placeholder="Type your messages here..."
        />
        <IconButton
          w="8%"
          p="0"
          size="xs"
          color="#87A6B4"
          bg="none"
          transform="rotate(-20deg)"
          aria-label="Send message"
          borderRadius="50%"
          as={MdSend}
          onClick={handleSubmit}
          _hover={{cursor: "pointer"}}
        />
      </HStack>
    </Box>
  )
}

export default ChatArea