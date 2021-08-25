import React, { PropsWithChildren } from "react";
import { GridItem } from "@chakra-ui/layout";

type MainProps = PropsWithChildren<{}>
function Main({ children }: MainProps) {
  return (
    <GridItem overflow="auto" bgColor="gray.100" position="relative">
      {children}
    </GridItem>
  )
}

export default Main