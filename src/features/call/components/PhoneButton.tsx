import React, { useState, MutableRefObject } from 'react'
import { Tooltip, Box, Text, IconButton } from '@chakra-ui/react'
import { PhoneIcon } from "@chakra-ui/icons";

function useMuteAudio(audio: MutableRefObject<HTMLAudioElement>) {
  const [muted, setMuted] = useState(audio.current.muted)

  return {
    muted,
    toggleMute: () => {
      setMuted(!muted)
      audio.current.muted = !audio.current.muted
    },
  }
}

type PhoneButtonProps = {
  audio: MutableRefObject<HTMLAudioElement>
}
function PhoneButton({ audio }: PhoneButtonProps) {
  const {muted, toggleMute} = useMuteAudio(audio)

  return (
    <Tooltip label={
      muted ?
        (
          <Box textAlign="center">
            <Text>Their audio is muted</Text>
            <Text>Click to unmute them</Text>
          </Box> 
        ):
        (
          <Box textAlign="center">
            <Text>You're listening to incoming sound.</Text>
            <Text>Click to mute them.</Text>
          </Box>
        )
    }>
      <IconButton
        aria-label="mute incoming audio"
        icon={<PhoneIcon />}
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

export default PhoneButton