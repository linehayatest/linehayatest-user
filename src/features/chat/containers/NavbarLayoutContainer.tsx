import React, { useState, ReactElement, JSXElementConstructor, PropsWithChildren } from 'react'
import { HStack, VStack, Box, Text, IconButton } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"

import Layout from "@layout/NavbarLayout"
import MobileMenu from '@features/chat/components/layout/MobileMenu'
import Navbar from '@features/chat/components/layout/Navbar'
import LineHayatLiveChat from '@features/chat/components/layout/LineHayatLiveChat'

import waitBackground from "@resources/images/Waiting Background.jpg"
import useUserStateStore from '@features/user/stores/stateStore'


type NavbarLayoutContainerProps = PropsWithChildren<{}>
function NavbarLayoutContainer({ children }: NavbarLayoutContainerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const userState = useUserStateStore(state => state.userState)

  return (
    <Layout>
      <Layout.Navbar>
        <Navbar isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
      </Layout.Navbar>

      <Layout.Main>
        <MobileMenu isOpen={isMenuOpen} />

        <VStack
          h="100%"
          bgRepeat="no-repeat"
          bgSize="cover"
          backgroundImage={`url("${waitBackground}")}`}
        >
          {
            userState === 'finish-chatting' ? null : (
              <Box w="100%" px={["24px", "256px"]} pt={["4", "4"]} pb="1">
                <LineHayatLiveChat />
              </Box>
            )
          }
          <Box flexGrow={1} w="100%" h="calc(100% - 11rem)">
            <Box mx="auto" h={["100%", "96%"]} w={["100%", "70%"]}>
              {children}
            </Box>
          </Box>
        </VStack>

      </Layout.Main>
    </Layout>
  )
}

export default NavbarLayoutContainer
