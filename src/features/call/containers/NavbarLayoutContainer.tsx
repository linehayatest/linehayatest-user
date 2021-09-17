import React, { useState, ReactElement, JSXElementConstructor, PropsWithChildren } from 'react'
import { HStack, VStack, Box, Button, Text, IconButton } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"

import history from '@globals/history'
import Layout from "@layout/NavbarLayout"
import MobileMenu from '@features/chat/components/layout/MobileMenu'
import Navbar from '@features/chat/components/layout/Navbar'
import LineHayatLiveCall from '../components/layout/LineHayatLiveCall'

import waitBackground from "@resources/images/Waiting Background.jpg"
import useUserStateStore from '@features/user/stores/stateStore'
import usePeerConnStore from '../stores/peerConnStore'


function HangupButton() {
  const peerConn = usePeerConnStore(state => state.peerConn)
  const setUserState = useUserStateStore(state => state.setUserState)

  return (
    <Button
    colorScheme="red"
    size="md"
    rounded="full"
    px="6"
    boxShadow="md"
    onClick={() => {
      setUserState('idling')
      peerConn.close();
      history.push("/")
    }}
  >Hang Up</Button>
  )
}

type NavbarLayoutContainerProps = PropsWithChildren<{
  isCallScreen: boolean,
}>
function NavbarLayoutContainer({ children, isCallScreen }: NavbarLayoutContainerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const userState = useUserStateStore(state => state.userState)
  const peerConn = usePeerConnStore(state => state.peerConn)

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
          <HStack
            w="100%"
            px={["24px", "256px"]}
            pt={["4", "4"]}
            pb="4"
            bgColor={isCallScreen ? "rgba(255, 255, 255, 0.4)" : "none"}
            boxShadow={isCallScreen ? "sm" : "none"}
          >
            <LineHayatLiveCall />
            {
              isCallScreen && 
                <HangupButton />
            }
          </HStack>
          <Box flexGrow={1} w="100%">
            <Box mx="auto" h={["100%"]} w={["100%", "70%"]}>
              {children}
            </Box>
          </Box>
        </VStack>
      </Layout.Main>
    </Layout>
  )
}

export default NavbarLayoutContainer
