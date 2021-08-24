import React, { useEffect } from "react";
import { Box, HStack, Text, Button, Textarea } from "@chakra-ui/react"

import Chat from "@features/chat/containers/Chat"
import useUserStateStore from "@features/user/stores/stateStore";
import { userState } from "@features/user/models/states";
import Test from "@pages/Test"
import useIsChatTabStore from "@features/user/stores/isChatTabStore";
import useUserStore from "@features/user/stores/userStore";
import { REST_URL } from "@globals/urls";
import axios from 'axios';

type ChatContentProps = {
  state: userState
}
function ChatContent({ state }: ChatContentProps) {
  const setUserState = useUserStateStore(state => state.setUserState)
  const { isChatTab, setIsChatTab } = useIsChatTabStore(state => ({
    isChatTab: state.isChatTab,
    setIsChatTab: state.setIsChatTab,
  }))
  const userId = useUserStore(state => state.userId)

  const onFeedbackFormSubmit = () => {
    setUserState("idling")  
  }

  // update isChatTab
  useEffect(() => {
    axios.get(`${REST_URL}/is_student_active_on_another_tab/${userId}`)
    .then(data => {
      const { isActive } = data.data
      setIsChatTab(!isActive)
    })      
  }, []);

  switch (state) {
    case 'idling': {
      return (
        <Test />
      )
    }
    // TODO: change this to be the same as Test last page
    case 'waiting': {
      return isChatTab ? (
        <HStack px="8" h="full" justifyContent="center" alignItems="center">
          <Text textAlign="center">
            Please wait awhile before our team pick up your request
          </Text>
        </HStack>
      ) : (
        <Text>You have another tab open that is making chat request. Please cancel that request before making one in this tab.</Text>
      )
    }
    case 'chatting': {
      return isChatTab ? (
        <Chat />
      ) : (
        <Text>You have another tab open that is chatting.</Text>
      )
    }
    case 'finish-chatting': {
      return (
        <Box textAlign="center">
          <Box mt="12">
            <Text mb="4">Feedback form</Text>
            <Text>Please rate this chat session.</Text>
          </Box>
          <Box mt="4">
            <span className="star-rating">
              <input type="radio" name="rating" value="1" /><i></i>
              <input type="radio" name="rating" value="2" /><i></i>
              <input type="radio" name="rating" value="3" /><i></i>
              <input type="radio" name="rating" value="4" /><i></i>
              <input type="radio" name="rating" value="5" /><i></i>
            </span>
          </Box>
          <Box mt="8" px="4">
            <Text>Additional Comments</Text>
            <Textarea 
              mx="auto"
              mt="4"
              placeholder="I think this could be improved..."
              variant="filled"
              rows={10}
            />
          </Box>
          <Button
            mt="4"
            colorScheme="whatsapp"
            onClick={onFeedbackFormSubmit}
          >
            Submit
          </Button>
        </Box>
      )
    }
  }
}

export default function ChatPage() {
  const studentState = useUserStateStore(state => state.userState)

  return (
    <Box h="100vh">
      <ChatContent state={studentState} />
    </Box>
  )
}
