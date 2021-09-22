import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Link as A } from "@chakra-ui/react"

function useIsLinkActive() {
  const { pathname } = useLocation()

  return (href: string) => pathname === href
}

type MobileMenuLinkProps = {
  text: string,
  href: string,
  active?: boolean
}
function MobileMenuLink({ text, href, active=false }: MobileMenuLinkProps) {
  return (
    <Box
      w="90%" py="2"
      mb="2" mx="auto"
      textAlign="center" rounded="md"
      fontWeight="semibold"
      color={active ? "green.600" : "gray.800"}
      bgColor={active ? "green.100": "#EDF2F7"}
    >
      <Link
        to={href}
      >
        {text}
      </Link>
    </Box>
  )
}

function MobileMenu() {
  const isLinkActive = useIsLinkActive()

  return (
    <Box w="full" h="full" bgColor="#EDF2F7">
      <MobileMenuLink
        active={isLinkActive("/")}
        text="Home"
        href="/volunteer"
      />
      <MobileMenuLink
        active={isLinkActive("/call")}
        text="Call"
        href="/call"
      />
      <MobileMenuLink
        active={isLinkActive("/chat")}
        text="Chat"
        href="/chat"
      />
    </Box>
  )
}

export default MobileMenu