import React, { PropsWithChildren } from "react";
import { Grid } from "@chakra-ui/layout";

import Main from "./Main"
import Navbar from "./Navbar"

type LayoutProps = PropsWithChildren<{}>
function Layout({ children }: LayoutProps) {
  return (
    <Grid
      templateRows="3rem 1fr"
      height="100vh"
      width="100vw"
    >
      {children}
    </Grid>
  )
}

Layout.Main = Main
Layout.Navbar = Navbar

export default Layout

