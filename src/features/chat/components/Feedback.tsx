import React from 'react'
import { Box, VStack, Text, Textarea, Button, Image } from '@chakra-ui/react'
import Rating from 'react-rating'

import useResetUser from '@features/user/hooks/useResetUser'
import history from '@globals/history'

import emptyStar from '@resources/images/IconStarEmpty.svg'
import filledStar from '@resources/images/IconStarFilled.svg'

function Feedback() {
  const resetUser = useResetUser()

  return (
    <VStack w="95%" h="full" alignItems="center" justifyContent="center" margin="auto">
      <VStack
        h={["90%"]} w={["100%", "70%"]}
        px={["4", "100px"]}
        bgColor="#CFDED7"
        fontFamily="Print Clearly"
        fontSize={["1.25rem", "1.5rem"]}
        fontWeight="600"
        rounded="2xl" boxShadow="md"
        justifyContent="center" alignItems="center"
        color="#5B4C43"
      >
        <Text fontFamily="Berkshire Swash">Feedback for LineHayat Live Chat</Text>
        <Text>Kindly rate this chat session</Text>

        <Rating
          emptySymbol={<Image src={emptyStar} />}
          fullSymbol={<Image src={filledStar} />}
        />
        <Text>Feel free to leave your comments...</Text>
        <Box mb="4" w="100%">
          <Textarea
            rounded="2xl"
            variant="filled"
            rows={6}
            placeholder="Type your message here..."
            fontSize="1em"
          ></Textarea>
        </Box>
        <Button
          onClick={() => {
            resetUser()
            history.push("/")
          }}
          rounded="full"
          boxShadow="md"
          bgColor="#FFFAE7"
          size="lg"
          fontSize="0.8em"
        >
          Submit
        </Button>
      </VStack>
    </VStack> 
  )
}

export default Feedback