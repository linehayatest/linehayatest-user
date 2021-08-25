import React from 'react'
import { Link } from 'react-router-dom'
import { HStack, Box, Text } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

import BurgerButton from './BurgerButton'
import LanguageButton from './LanguageButton'
import LineHayatNavLogo from './LineHayatNavLogo'

type NavbarLinkProps = {
  text: string,
  link: string
}
function Navlink({ text, link }: NavbarLinkProps) {
  return (
    <Text
      px="2"
      fontSize="16px"
      fontWeight="500"
      fontFamily="noto-sans-display"
      textTransform="uppercase"
      style={{
        textUnderlineOffset: "8px",
      }}
      _hover={{
        textDecoration: "underline",
      }}
    >
      <Link to={link}>{text}</Link>
    </Text>
  )
}

type NavbarProps = {
  isOpen: boolean,
  onToggle: () => void,
}
function Navbar({ isOpen, onToggle }: NavbarProps) {
  return (
    <HStack
      justifyContent="flex-start"
      px={["0", "8"]}
      w="100%" h="100%"
      bgColor="#AFCDCD"
      spacing={[0, 8]}
    >
      <HStack spacing={8} flexBasis={['33.33%', '100%']}>
        <BurgerButton
          display={["block", "block", "none"]}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          ariaLabel=""
          ml="2"
        />
        <Text 
          display={["none", "block"]}
          textAlign="center">
          <LineHayatNavLogo />
        </Text>
        <HStack h="full" display={["none", "flex"]}>
          <Navlink text="who we are" link="/aboutus" />
          <Navlink text="react us" link="#" />
          <Navlink text="volunteer" link="#" />
          <Navlink text="support us" link="#" />
          <Navlink text="resources" link="#" />
          <Navlink text="faq" link="#" />
          <Navlink text="our contacts" link="#" />
        </HStack>
      </HStack>

      <HStack
        m="0" p="0"
        flexBasis={['33.33%', 'auto']}
        display={['flex', 'none']}
        justifyContent="center"
      >
        <LineHayatNavLogo />
      </HStack>

      <Box flexBasis={['33.33%', 'auto']} display='block'>
        <Box ml="auto" w="105px" mr="4">
          <LanguageButton />
        </Box>
      </Box>
    </HStack>
  )
}

export default Navbar