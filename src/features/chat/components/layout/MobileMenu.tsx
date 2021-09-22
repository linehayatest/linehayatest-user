import React from "react"
import { Box } from '@chakra-ui/react'

import MobileMenuContent from "@features/chat/containers/MobileMenu"

function MobileMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <Box w="full" h="full" bgColor="#EDF2F7" hidden={!isOpen} position="fixed" top="3rem" left="0" overflow="auto" zIndex={2}>
      <MobileMenuContent />
    </Box>
  )
}

export default MobileMenu