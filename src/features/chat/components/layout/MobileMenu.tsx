import React from "react"
import { Box } from '@chakra-ui/react'

function MobileMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <Box w="full" h="full" bgColor="gray" hidden={!isOpen} position="fixed" top="3rem" left="0" overflow="auto">
    </Box>
  )
}

export default MobileMenu