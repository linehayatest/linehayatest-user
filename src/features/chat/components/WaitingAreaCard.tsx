import React, { useState, useEffect, MouseEvent } from 'react'
import { GridItem, VStack, HStack, Box, Button, Text, Checkbox, UnorderedList, OrderedList, ListItem, Image } from '@chakra-ui/react'

import phoneCallGif from "@resources/images/LH-Phone-Call-Compressed.gif"
import testImage from "@resources/images/123testimage.png"

type CardGraphicsProps = {
  [x: string]: any
}
function CardGraphics(props: CardGraphicsProps) {
  return (
    <Box
      {...props}
      w={["120px", "200px"]}
      h={["120px", "200px"]}
      borderRadius="50%"
      bgColor="gray.300"
    >

    </Box>
  )
}

function useContent() {
  const [cardNum, setCardNum] = useState(0)
  const [agreeTnc, setAgreeTnc] = useState(false)
  const tncCard = 2

  const cards = [
    // Card 1
    (
      <VStack h="full" w="full" px="2" justifyContent="center" fontSize="2rem" fontFamily="Print Clearly" fontWeight="600" color="#5B4C43">
        <Text textAlign="center" mb="4">Hi, how are you today?</Text>
        <Text textAlign="center">Would you like to talk to someone?</Text>
      </VStack>
    ),
    // Card 2
    (
      <VStack h="full" w="full" px="2" justifyContent="center" fontSize="24px" fontFamily="Print Clearly" fontWeight="600" textAlign="center">
        <Text mb="4" mt="2" fontFamily="Berkshire Swash" fontWeight="400" fontSize="1.5rem" color="#5B4C43">How does LineHayat's anonymous chat support service work?</Text>
        <HStack
          display={["none", "flex"]}
          justifyContent="center"
          spacing={8}
          mb="16"
        >
          <CardGraphics />
          <CardGraphics />
          <CardGraphics />
        </HStack>
        <VStack
          display={["flex", "none"]}
          flexDirection="column"
          mb="4"
        >
          <Image
            boxSize="6rem"
            src={testImage}
            alt="Test image"
          />
          <Image
            boxSize="6rem"
            src={testImage}
            alt="Test image"
          />
          <Image
            boxSize="6rem"
            src={testImage}
            alt="Test image"
          />
        </VStack>
        <Text fontSize={["1rem", "1.5rem"]} color="#5B4C43">Note: Every chat is appointed at an approximate 20 minutes</Text>
      </VStack>
    ),
    // Card 3
    (
      <VStack h="full" w="full" px="2" pt="4" justifyContent="center" fontSize="1.25rem" fontFamily="Print Clearly" fontWeight="600" textAlign="center" overflow="auto">
        <Text fontFamily="Berkshire Swash" fontWeight="400" color="#5B4C43" fontSize="1.25em">Terms of Use</Text>
        <Box textAlign="left" px="8">
          <Text fontSize="1em" mb="4" color="#5B4C43">
            By using LineHayat Support Services, you agree to the Terms and Conditions stated below. LineHayat is a Listening Service delivered by a team of well-trained Listening Volunteers and it is provided for USM students only.
          </Text>
          <OrderedList fontSize="1em" mb="8" color="#5B4C43">
            <ListItem>We provide immediate and accessible emotional support to students.</ListItem>
            <ListItem>We listen with an empathic, collaborative, and non-judgmental stance.</ListItem>
            <ListItem>We provide a safe space for you to talk or share feelings and thoughts.</ListItem>
            <ListItem>We do not provide professional counselling, medical advice, or treatment of any conditions.</ListItem>
            <ListItem>We are not and will not be treated as an emergency service or substitute or alternative to professional health care.</ListItem>
            <ListItem>We have taken three significant steps to ensure a high level of security:</ListItem>
            <OrderedList fontSize="1em" listStyleType="upper-roman">
              <ListItem>Both you and the Listening Volunteer will remain anonymous.</ListItem>
              <ListItem>We will never track your IP address.</ListItem>
              <ListItem>We will never save session transcripts. All chats will be automatically deleted when the conversation ends.</ListItem>
            </OrderedList>
          </OrderedList>
          <HStack justifyContent="flex-end">
            <Checkbox
              size="lg"
              value="agree"
              checked={agreeTnc}
              defaultIsChecked={agreeTnc}
              onChange={() => setAgreeTnc(!agreeTnc)}
              color="#5B4C43"
            >
              I agree with all the terms and conditions listed above
            </Checkbox>
          </HStack>
        </Box>
      </VStack>
    ),
    // Card 4
    (
      <VStack
        justifyContent="center"
        h="full" w="full"
        px="2"
        fontSize="1.25rem" fontFamily="Print Clearly" fontWeight="600" textAlign="center"
        overflow="auto"
      >
        <Box h="140px" overflowY="hidden" marginTop={["0", "-48px"]}>
          <Image
            src={phoneCallGif}
            h="320px"
            marginTop="-100px"
            objectFit="scale-down"
          />
        </Box>
        <Text fontFamily="Berkshire Swash" fontWeight="400" fontSize="28px" color="#5B4C43">Waiting Room</Text>

        <VStack fontSize="1em" w="100%" px="4" justifyContent="center" color="#5B4C43">
          <Text>Hi Friend,</Text>
          <Text>you are in the queue.</Text>

          <Text>I will reach out to you soon. Thank you for your patience.</Text>

          <Text>While waiting, I would like to tell you:</Text>
          <UnorderedList w={["auto", "480px"]} textAlign="left">
            <ListItem>Feel free to share your feelings and thoughts.</ListItem>
            <ListItem>Talk at your own pace and willingness.</ListItem>
            <ListItem>It’s okay to stay silent if you want to gather your thoughts.</ListItem>
          </UnorderedList>

          <Text mb="8">I appreciate you being here today.</Text>

          {/* <Text
            fontSize="18px"
          >
            If waiting is not an option for you, clicking here will redirect you to a list of other helplines.
          </Text> */}
        </VStack>
      </VStack>
    )
  ]

  return {
    cardNum,
    card: cards[cardNum],
    nextCard: () => setCardNum(cardNum + 1),
    prevCard: () => setCardNum(cardNum - 1),
    disableNext: cardNum >= tncCard ? !agreeTnc : false,
    canNext: cardNum < cards.length - 1,
    canPrev: cardNum !== 3 && cardNum > 0,
  }
}


type WaitingAreaButtonProps = {
  text: string,
  disabled?: boolean,
  bgColor: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}
function WaitingAreaButton({ text, disabled=false, bgColor, onClick=()=>{} }: WaitingAreaButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled} fontFamily="Quicksand" borderRadius="999px" w="120px" bgColor={bgColor} color="#5B4C43" boxShadow="md">
      {text}
    </Button>
  )
}

type WaitingAreaCardProps = {
  onLastCard: () => void,
}
function WaitingAreaCard({ onLastCard }: WaitingAreaCardProps) {
  const {
    cardNum,
    card,
    nextCard,
    prevCard,
    disableNext,
    canNext,
    canPrev,
  } = useContent()

  useEffect(() => {
    if (cardNum === 3) {
      onLastCard()
    }
  }, [cardNum])

  return (
    <VStack
      w="100%" h="100%"
      spacing={0}
    >
      <VStack flexGrow={1} w="full" bgColor="#CFDED7" rounded="xl" borderBottomRadius="0">
        <Box h="full" w="full">
          {card}
        </Box>
      </VStack>
      <HStack
        display={cardNum === 3 ? "none" : "flex"}
        w="100%" py="4" px={["4", "8"]}
        flexBasis="40px"
        justifyContent="space-between"
        bgColor="#CFDED7"
        rounded="xl"
        borderTopRadius="0"
      >
        {canPrev ? (
          <WaitingAreaButton text="Previous" bgColor="#F3F3F3" onClick={prevCard} />
        ) : <Box /> }
        {canNext ? (
          <WaitingAreaButton text="Next" bgColor="#FFFAE7" disabled={disableNext} onClick={nextCard} />
        ) : <Box />}
      </HStack>
    </VStack>
  )
}

export default WaitingAreaCard