import React, { useEffect } from "react";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Text, Textarea, ChakraProvider, extendTheme, useDisclosure } from "@chakra-ui/react";

import Home from "@pages/Home"
import ChatPage from "@pages/Chat";
import Test from "@pages/Test"
import useHandleEvents from "@features/server/hooks/useHandleEvents";
import { BASE_URL } from "@globals/urls"
import history from "@globals/history"
import ReadyState, { readyState } from "@features/server/models/readyState"
import useWebSocketStore from "@features/server/stores/webSocketStore";
import useRequestChat from "@features/server/hooks/useRequestChat";
import useOnSocketOpen from "@features/server/hooks/useOnSocketOpen";
import useReconnect from "@features/server/hooks/useReconnect";
import useResetUser from "@features/user/hooks/useResetUser";
import useInitServer from "@features/server/hooks/useInitServer";

import { Box, Button } from "@chakra-ui/react"

import "@fontsource/quicksand"
import "@fontsource/noto-sans"

import "@pages/App/styles.css"
import ReconnectModal from "@features/server/components/ReconnectModal";
import useResetUserOnload from "@features/user/hooks/useResetUserOnload";


export default function App() {
  useHandleEvents()

  useInitServer()

  useResetUserOnload()

  return (
    <Router history={history}>
      <ReconnectModal />
      <Switch>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="/test">
          <FinishChatting />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function FinishChatting() {
  return (
    <Box h="100vh" w="100vw" textAlign="center">
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
      <Button mt="4" colorScheme="whatsapp">Submit</Button>
    </Box>
  )
}