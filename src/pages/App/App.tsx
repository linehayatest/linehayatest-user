import React, { useEffect } from "react";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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

import "@fontsource/quicksand"
import "@fontsource/noto-sans"

import "@pages/App/styles.css"


export default function App() {
  useHandleEvents()

  useInitServer()

  return (
    <Router history={history}>
      <Switch>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        </Switch>
    </Router>
  );
}

