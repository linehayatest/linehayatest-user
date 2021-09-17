import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'

import chatBubbles from '@resources/images/CallServiceIcon.png'

function LineHayatLiveCall() {
  return (
    <HStack w={["90%", "70%"]}>
      <Image src={chatBubbles} w="8" mr="2" />
      <Text
        fontWeight="900" fontFamily="quicksand" fontSize="34"
        color="#5B4C43"
      >
        LineHayat Call Service
      </Text>
    </HStack>
  )
}

export default LineHayatLiveCall