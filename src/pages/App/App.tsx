import React from "react";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { Text, VStack, Textarea, ChakraProvider, extendTheme, useDisclosure } from "@chakra-ui/react";

import Home from "@pages/Home"
import ChatPage from "@pages/Chat";
import CallPage from "@pages/Call";
import useHandleEvents from "@features/server/hooks/useHandleEvents";
import history from "@globals/history"
import useInitServer from "@features/server/hooks/useInitServer";

import { Box, Button } from "@chakra-ui/react"

import "@fontsource/quicksand"
import "@fontsource/noto-sans"

import "@pages/App/styles.css"
import Feedback from "@features/chat/components/Feedback"
import ReconnectModal from "@features/server/components/ReconnectModal";
import useResetUserOnload from "@features/user/hooks/useResetUserOnload";
import CallScreen from "@features/call/components/CallScreen"

export default function App() {
  useHandleEvents()

  useInitServer()

  useResetUserOnload()

  return (
    <Router history={history}>
      <ReconnectModal />
      <Switch>
        <Route path="/finish">
          <VStack justifyContent="center">
            <Feedback />
          </VStack>
        </Route>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="/call">
          <CallPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}