import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, HStack, Text, Tooltip } from "@chakra-ui/react";

import history from "@globals/history"
import useIsChatTabStore from "@features/user/stores/isChatTabStore";


function Home() {
  const isChatTab = useIsChatTabStore(state => state.isChatTab)

  return (
    <>
      <Box py="20">
        <Text textAlign="center">LineHayat Home page</Text>
      </Box>

      <HStack justifyContent="center" spacing="8" mb="8">
        <Tooltip hasArrow label="Calling is not available yet" shouldWrapChildren>
          <Button
            isDisabled
            w={20}
            onClick={() => history.push('/call')}
          >
            Call
          </Button>
        </Tooltip>

        <Link to='/chat'
        ><Button disabled={!isChatTab} w={20}>Chat</Button></Link>
      </HStack>
    </>
  );
}

export default Home;