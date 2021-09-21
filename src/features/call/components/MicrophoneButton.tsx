import React, { useState, MutableRefObject } from 'react'
import { Tooltip, Box, Text, IconButton } from '@chakra-ui/react'
import { FaMicrophone } from 'react-icons/all'

import useStreamStore from '../stores/streamStore'

function useMuteLocalAudio(stream: MediaStream) {
  const [muted, setMuted] = useState(stream.getAudioTracks()[0].enabled)

  return {
    muted,
    toggleMute: () => {
      setMuted(!muted)
      stream.getAudioTracks().forEach(
        stream => stream.enabled = !stream.enabled
      )
    },
  }
}


function MicrophoneButton() {
  const localStream = useStreamStore(state => state.stream)
  const {muted, toggleMute} = useMuteLocalAudio(localStream)

  return (
    <Tooltip label={
      muted ?
        (
          <Box textAlign="center">
            <Text>Your audio is muted</Text>
            <Text>Click to unmute yourself</Text>
          </Box> 
        ):
        (
          <Box textAlign="center">
            <Text>Your audio is connected</Text>
            <Text>Click to mute yourself</Text>
          </Box>
        )
    }>
      <IconButton
        aria-label="mute your audio"
        icon={<FaMicrophone />}
        p="2"
        rounded="full"
        boxShadow="md"
        bgColor={muted ? "#C97970" : "#AFCDD0"}
        color={muted ?  "white" : "#5A4C43"}
        _hover={ muted ?
          {bgColor:"#C97970", color: "white"} :
          {bgColor:"#AFCDD0", color: "#5A4C43"}
        }
        onClick={toggleMute}
      />
    </Tooltip>
  )
}

export default MicrophoneButton