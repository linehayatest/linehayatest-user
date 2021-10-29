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
    <VStack w="full" h="full" alignItems="center" justifyContent="center">
      <VStack
        h={["90%"]} w={["100%", "70%"]}
        px={["4", "100px"]}
        bgColor="#CFDED7"
        fontFamily="Print Clearly"
        fontSize="1.5em"
        fontWeight="600"
        rounded="2xl" boxShadow="md"
        justifyContent="center" alignItems="center"
      >
        <Text fontFamily="Berkshire Swash" fontSize="1.25em">Feedback for LineHayat Live Chat</Text>
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
            fontWeight="500"
            rows={6}
            placeholder="Type your message here..."
          ></Textarea>
        </Box>
        <Button
          onClick={() => {
            resetUser()
            history.push("/")
          }}
          rounded="full"
          boxShadow="md"
        >
          Submit
        </Button>
      </VStack>
    </VStack> 
  )
}

export default Feedback