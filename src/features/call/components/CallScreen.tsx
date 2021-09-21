import React, { MutableRefObject, useState, useCallback } from 'react'
import {
  HStack,
  VStack,
  Image,
} from '@chakra-ui/react'

import PhoneButton from './PhoneButton';
import MicrophoneButton from './MicrophoneButton';

import logo from '@resources/images/LineHayat-WhiteBackground.svg'

type ContentProps = {
  remoteAudio: MutableRefObject<HTMLAudioElement>,
  localAudio: MutableRefObject<HTMLAudioElement>,
}
function CallScreen({ remoteAudio, localAudio }: ContentProps) {
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
        <MicrophoneButton />
        <PhoneButton audio={remoteAudio} />
      </HStack>
    </VStack>
  )
}

export default CallScreen