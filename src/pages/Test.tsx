import React, { useState, useEffect } from 'react'
import { useBreakpointValue } from '@chakra-ui/media-query'
import { Box, Button, HStack, Image, Text, Link as A, VStack } from "@chakra-ui/react"
import { TriangleDownIcon } from "@chakra-ui/icons"

import waitBackground from "@resources/images/Waiting Background.png"
import linehayatLogo from "@resources/images/LineHayat.png"
import unionJack from "@resources/images/UnionJackx2.png"
import chatBubbles from "@resources/images/ChatBubbles.svg"
import useUserStateStore from '@features/user/stores/stateStore'
/*
Navbar
  Background: #AFCDCD
  WHO WE ARE:
    noto-sans-display
    23
    Black


Chat bubbles
  LineHayat Call Service
    Quicksand
    34
    #5B4C43

Hi, how are you today?
  40 
  QuickSand
  #5B4C43
  Background: #F3F3F3

Next button
  Text: Quicksand 30 Black
  Background: #C2D7D9

*/

function Navbar() {
  const content = useBreakpointValue({
    base: (
      <>
        <Box></Box>
        <Image
          h="12"
          src={linehayatLogo}
        />
        <Box></Box>
      </>
    ),
    md: (
      <>
        <HStack h="full">
          <Image
            h="12"
            src={linehayatLogo}
          />
          <NavbarLink text="who we are" />
          <NavbarLink text="reach us" />
          <NavbarLink text="volunteer" />
          <NavbarLink text="support us" />
          <NavbarLink text="resources" />
          <NavbarLink text="faq" />
          <NavbarLink text="our contacts" />
        </HStack>
        <Box>
          <Button h="10" pl="1" pr="2" rounded="none">
            <Image src={unionJack} h="8"/>
            <TriangleDownIcon h="3" w="3" pl="1" pr="0" mx="0" color="gray.600" />
          </Button>
        </Box>
      </>
    )
  })

  return (
    <HStack
      h="14" w="100vw"
      px={["0", "10"]}
      backgroundColor="#AFCDCD"
      shadow="md"
      justifyContent={["space-between"]}
    >
      {content}
    </HStack>
  )
}

function useCard(max: number) {
  const [cardNum, setCardNum] = useState(0)
  const setUserState = useUserStateStore(state => state.setUserState)

  useEffect(() => {
    setCardNum(0)
  }, [])

  return {
    card: cardNum,
    next: () => {
      if (cardNum !== max) {
        setCardNum(cardNum + 1)
      }
      if (cardNum === max - 1) {
        setUserState('waiting')
      }
    },
    previous: () => {
      if (cardNum !== 0) {
        setCardNum(cardNum - 1)
      }
    }
  }
}

type NavbarLinkProps = {
  text: string
}
function NavbarLink({ text }: NavbarLinkProps) {
  return (
    <Text
      px="2"
      fontSize="16px"
      fontWeight="500"
      fontFamily="noto-sans-display"
      textTransform="uppercase">
      <A>{text}</A>
    </Text>
  )
}

function CardCircleGraphics() {
  return (
    <Box
      w={["24", "40"]} h={["24", "40"]}
      borderRadius="50%"
      bgColor="gray.300"
    >
    </Box>
  )
}

type CardContentProps = {
  cardNum: number
}
function CardContent({ cardNum }: CardContentProps) {
  const components = [
    <Box h="full" w="full" pt="160px">
      <Text mb="8">Hi, how are you today?</Text>
      <Text>Would you like to talk to someone?</Text>
    </Box>,
    <Box pt={["20px", "40px"]}>
      <Text mb={["2", "6"]}>How LineHayat's anonymous call service works?</Text>
      <HStack flexWrap="wrap" justifyContent="space-around" mx={["0", "24"]}>
        <CardCircleGraphics />
        <CardCircleGraphics />
        <CardCircleGraphics />
      </HStack>
      <Text
        mt={["6", "12"]}
        fontFamily="noto-sans-display"
        fontWeight="600"
        fontSize={["16px", "20px"]}>
        Note: Every call is appointed at an approximate time of 20 mins.
      </Text>
    </Box>,
    <Box py="40">
      <Text>Waiting Room</Text>
    </Box>
  ]
  return components[cardNum]
}

function Test() {
  const maxCard = 2
  const { card, next, previous } = useCard(maxCard)

  return (
    <VStack
      w={["100vw"]} h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url("${waitBackground}")}`}
      alignItems="normal"
      spacing="0"
    >
      <Box mb="4">
        <Navbar />
      </Box>
      <Box flexGrow={1}>
        <HStack w={["90%", "70%"]} mx="auto" mb={["4", "0"]} py={["0", "4"]}>
          <Image src={chatBubbles} w="14" mr="4" />
          <Text
            fontWeight="900" fontFamily="quicksand" fontSize="34"
            color="#5B4C43"
          >
            LineHayat Call Service
          </Text>
        </HStack>
        <Box
          position="relative"
          h="80%" w={["100%", "70%"]}
          mx="auto" px={["4", "0"]}
          textAlign="center"
          fontSize="24px"
          fontFamily="quicksand"
          fontWeight="bold"
          color="#5B4C43"
          bgColor="#F3F3F3"
          rounded={["none", "xl"]}
        >
          <Box h="85%">
            <CardContent cardNum={card} />
          </Box>
          <HStack
            w="100%"
            justifyContent="space-between"
            px={["0", "8"]}
          >
            <Button
              disabled={card === 0 || card === maxCard}
              display={true ? "block" : "none"} px="6" 
              bgShadow="lg" fontWeight="bold"
              rounded="full" bgColor="#C2D7D9"
              _hover={{bgColor: "#C2D7D9"}}
              onClick={() => previous()}
            >
              Prev
            </Button>
            <Button
              disabled={card === maxCard}
              display="block" px="6"
              bgShadow="lg" fontWeight="bold"
              rounded="full" bgColor="#C2D7D9"
              _hover={{bgColor: "#C2D7D9"}}
              onClick={() => next()}
            >
              Next
            </Button>
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}

export default Test


// <Text fontFamily="quicksand">haha</Text>      
//       <Text textTransform="uppercase" fontFamily="noto-sans-display">
//         Support Us
//       </Text>