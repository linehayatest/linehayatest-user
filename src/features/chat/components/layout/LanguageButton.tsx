import React from 'react'
import { Button, Image } from '@chakra-ui/react'
import { TriangleDownIcon } from '@chakra-ui/icons'

import unionJack from "@resources/images/UnionJackx2.png"

function LanguageButton() {
  return (
    <Button h="10" pl="2" pr="2" rounded="none">
      <Image src={unionJack} h="8"/>
      <TriangleDownIcon h="3" w="3" pl="1" pr="0" mx="0" color="gray.600" />
    </Button>
  )
}

export default LanguageButton