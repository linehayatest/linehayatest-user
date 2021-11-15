import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'

import chatBubbles from '@resources/images/chat-bubbles.svg'

function LineHayatLiveChat() {
  return (
    <HStack w={["90%", "70%"]}>
      <Image src={chatBubbles} w="14" mr="4" />
      <Text fontFamily="Berkshire Swash" fontWeight="400"  fontSize="1.25em" color="#5B4C43">
        LineHayat Live Chat
      </Text>
    </HStack>
  )
}

export default LineHayatLiveChat