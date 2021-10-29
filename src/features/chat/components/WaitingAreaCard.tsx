import React, { useState, useEffect, MouseEvent } from 'react'
import { Grid, GridItem, VStack, HStack, Box, Button, Text, Checkbox, UnorderedList, OrderedList, ListItem, Image } from '@chakra-ui/react'

import phoneCallGif from "@resources/images/LH-Phone-Call-Compressed.gif"

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
      <VStack h="full" w="full" px="2" justifyContent="center" fontSize="24px" fontFamily="Print Clearly" fontWeight="600">
        <Text textAlign="center" mb="4">Hi, how are you today?</Text>
        <Text textAlign="center">Would you like to talk to someone?</Text>
      </VStack>
    ),
    // Card 2
    (
      <VStack h="full" w="full" px="2" justifyContent="center" fontSize="24px" fontFamily="Print Clearly" fontWeight="600" textAlign="center">
        <Text mb="4" mt="2" fontFamily="Berkshire Swash" fontWeight="400" fontSize="20px">How LineHayat's anonymous chat support service works?</Text>
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
        <Grid
          display={["grid", "none"]}
          templateRows="1fr 1fr"
          templateColumns="1fr 1fr"
          gridColumnGap="2rem"
          mb="4"
        >
          <GridItem>
            <CardGraphics />
          </GridItem>
          <GridItem>
            <CardGraphics />
          </GridItem>
          <GridItem colSpan={2}>
            <HStack justifyContent="center">
              <CardGraphics />
            </HStack>
          </GridItem>
        </Grid>
        <Text fontSize={["16px", "24px"]}>Note: Every chat is appointed at an approximate 20 minutes</Text>
      </VStack>
    ),
    // Card 3
    (
      <VStack h="full" w="full" px="2" pt="4" justifyContent="center" fontSize="24px" fontFamily="Print Clearly" fontWeight="600" textAlign="center" overflow="auto">
        <Text fontFamily="Berkshire Swash" fontWeight="400">Terms of Use</Text>
        <Box textAlign="left" px="8">
          <Text fontSize="18px" mb="4">
            By using LifeHayat Support Services, you have agreed to the Terms and Conditions stated below. LineHayat support service is delivered by a team of well-trained Listening Volunteers and is provided for university students only.
          </Text>
          <OrderedList fontSize="16px" mb="8">
            <ListItem>We provide immediate and accessible emotional support to university students.</ListItem>
            <ListItem>We listen with an empathic, collaborative, and non-judgemental stance.</ListItem>
            <ListItem>We provide a safe space for you to talk or share feelings and thoughts.</ListItem>
            <ListItem>We do not provide professional counselling, medical advice, or treatment of any conditions.</ListItem>
            <ListItem>We will not be treated as an emergency service or subsitute or alternative to professional health care.</ListItem>
            <ListItem>We will not ask for identifying information (such as your name or address) unless follow-up is required. A follow-up call will only be given on your request and agreement.</ListItem>
            <ListItem>We have taken three significant steps to ensure a high level of security:</ListItem>
            <OrderedList fontSize="16px" listStyleType="upper-roman">
              <ListItem>Both you and the Listening Volunteer will remain anonymous.</ListItem>
              <ListItem>We will never track your IP address.</ListItem>
              <ListItem>We will never save session transcripts. All chats will be automatically deleted as the conversation ends.</ListItem>
            </OrderedList>
          </OrderedList>
          <HStack justifyContent="flex-end">
            <Checkbox
              size="sm"
              value="agree"
              checked={agreeTnc}
              defaultIsChecked={agreeTnc}
              onChange={() => setAgreeTnc(!agreeTnc)}
            >
              I agree with all the terms and conditions listed above.
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
        fontSize="24px" fontFamily="Print Clearly" fontWeight="600" textAlign="center"
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
        <Text fontFamily="Berkshire Swash" fontWeight="400" fontSize="28px">Waiting Room</Text>

        <VStack fontSize="18px" w="100%" px="4" justifyContent="center">
          <Text>Hi Friend, I am your listener today.</Text>
          <Text>You are now in the queue. I will reach you soon.</Text>

          <Text>Thank you for your patience.</Text>

          <Text>While waiting to get in, there are few things that I would like to tell you:</Text>
          <UnorderedList w={["auto", "480px"]} textAlign="left">
            <ListItem>Feel free to share your feelings and thoughts.</ListItem>
            <ListItem>Talk at your own pace and willingness.</ListItem>
          </UnorderedList>

          <Text mb="8">I appreciate you being here.</Text>

          <Text
            fontSize="18px"
          >
            If it is not very convenient for you to wait, please click here for a list of other resources.
          </Text>
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
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}
function WaitingAreaButton({ text, disabled=false, onClick=()=>{} }: WaitingAreaButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled} borderRadius="999px" w="120px" bgColor="#C2D7D9">
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
      <VStack flexGrow={1} w="full" bgColor="#F3F3F3" rounded="xl">
        <Box h="full" w="full">
          {card}
        </Box>
      </VStack>
      <HStack
        display={cardNum === 3 ? "none" : "flex"}
        w="100%" py="4" px={["4", "8"]}
        flexBasis="40px"
        justifyContent="space-between"
        bgColor="#F3F3F3"
        rounded="xl"
      >
        {canPrev ? (
          <WaitingAreaButton text="Previous" onClick={prevCard} />
        ) : <Box /> }
        {canNext ? (
          <WaitingAreaButton text="Next" disabled={disableNext} onClick={nextCard} />
        ) : <Box />}
      </HStack>
    </VStack>
  )
}

export default WaitingAreaCard