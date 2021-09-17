import React, { MutableRefObject, useState, useCallback } from 'react'
import { Text, Button, HStack, Box, VStack, Image, IconButton, Tooltip } from '@chakra-ui/react'
import { PhoneIcon } from "@chakra-ui/icons";
import { FaMicrophone } from 'react-icons/all'

import NavbarLayoutContainer from "@features/call/containers/NavbarLayoutContainer";
import logo from '@resources/images/LineHayat-WhiteBackground.svg'

type ContentProps = {
  remoteAudio: MutableRefObject<HTMLAudioElement>,
  localAudio: MutableRefObject<HTMLAudioElement>,
}
function CallScreen({ remoteAudio, localAudio }: ContentProps) {
  const [forceRerender, setForceRerender] = useState(false)

  const mutedLocal = localAudio.current?.muted
  const mutedRemote = remoteAudio.current?.muted

  const MicrophoneButton = useCallback(({ muted }: { muted: boolean }) => {
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
          onClick={() => {
            /*
            if(muted) {
              localAudio.current?.play()
            } else {
              localAudio.current?.pause()
            }
            */
            setForceRerender(!forceRerender)
          }}
        />
      </Tooltip>
    )
  }, [remoteAudio, localAudio, forceRerender])

  const PhoneButton = useCallback(({ muted }: { muted: boolean }) => {
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
          onClick={() => {
            if (remoteAudio.current) {
              remoteAudio.current.muted = !remoteAudio.current.muted
            }
            setForceRerender(!forceRerender)
          }}
        />
      </Tooltip>
    )
  }, [remoteAudio, localAudio, forceRerender])

  return (
    <VStack h="full" w="full">
      <HStack flexBasis="80%" w="full" justifyContent="center" alignItems="center">
        <Image src={logo} w={["140px", "200px"]} />
      </HStack>
      <HStack
        justifyContent="center"
        spacing={8} flexGrow={1}
        w="100vw"
        bgColor="rgba(255, 255, 255, 0.4)"
      >
        <MicrophoneButton muted={mutedLocal} />
        <PhoneButton muted={mutedRemote} />
      </HStack>
    </VStack>
  )
}

export default CallScreen