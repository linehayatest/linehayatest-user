import React, { useEffect, useRef, MutableRefObject, useState } from 'react'
import { Text, Box, Button, Image } from '@chakra-ui/react'
import Peer from 'peerjs'

import useSetupPeer from '@features/call/hooks/useSetupPeer'
import useUserStateStore from '@features/user/stores/stateStore'
import WaitingAreaCard from '@features/call/components/WaitingAreaCard'
import NavbarLayoutContainer from '@features/call/containers/NavbarLayoutContainer'
import CallScreen from '@features/call/components/CallScreen'

import logo from '@resources/logo.svg'

type ContentProps = {
  remoteAudio: MutableRefObject<HTMLAudioElement>,
  localAudio: MutableRefObject<HTMLAudioElement>,
}
function Content({ remoteAudio, localAudio }: ContentProps) {
  const {userState, setUserState} = useUserStateStore(state => ({
    userState: state.userState,
    setUserState: state.setUserState,
  }))
  const [forceRerender, setForceRerender] = useState(false)

  const mutedLocal = localAudio.current?.paused

  switch(userState) {
    case 'calling': {
      return (
        <CallScreen remoteAudio={remoteAudio} localAudio={localAudio} />
      )
    }
    default: {
      return (
        <WaitingAreaCard onLastCard={() => {
          setUserState('waiting-call')
        }}
      />
      )
    }
  }
}

function Call() {
  const userState = useUserStateStore(state => state.userState)
  const remoteAudio = useRef<null|HTMLAudioElement>(null)
  const localAudio = useRef<null|HTMLAudioElement>(null)
  const peer = new Peer(); 

  const setupPeer = useSetupPeer()

  useEffect(() => {
    if (userState === 'waiting-call') {
      setupPeer({ peer, localAudio, remoteAudio })
    }
  }, [userState])


  return (
    <NavbarLayoutContainer isCallScreen={userState === 'calling'}>
      <Content remoteAudio={remoteAudio} localAudio={localAudio} />
      <Box visibility="hidden">
        <audio ref={remoteAudio} muted></audio>
        <audio ref={localAudio} muted></audio>
      </Box>
    </NavbarLayoutContainer>
  )
}

export default Call