import React from "react";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "@pages/Home"
import ChatPage from "@pages/Chat";
import CallPage from "@pages/Call";
import useHandleEvents from "@features/server/hooks/useHandleEvents";
import useInitServer from "@features/server/hooks/useInitServer";

// import "@fontsource/quicksand"
// import "@fontsource/noto-sans"

import "@pages/App/styles.css"
import Feedback from "@features/chat/components/Feedback"
import ReconnectModal from "@features/server/components/ReconnectModal";
import useResetUserOnload from "@features/user/hooks/useResetUserOnload";
import history from "@globals/history";

export default function App() {
  useHandleEvents();
  useInitServer();
  useResetUserOnload();

  return (
    <Router history={history}>
      <ReconnectModal />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/chat" component={ChatPage} />
        <Route path="/call" component={CallPage} />
        <Route path="/finish" component={Feedback} />
      </Switch>
    </Router>
  );
}