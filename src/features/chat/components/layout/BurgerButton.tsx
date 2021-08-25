import React, { ReactElement, JSXElementConstructor } from 'react'
import { IconButton } from '@chakra-ui/react'

type BurgerButtonProps = {
  icon: ReactElement<any, string | JSXElementConstructor<any>>,
  onClick: () => void,
  ariaLabel: string,
  [x: string]: any,
}
function BurgerButton({ icon, onClick, ariaLabel, ...props }: BurgerButtonProps) {
  return (
    <IconButton
      icon={icon}
      onClick={onClick}
      aria-label={ariaLabel}
      size="sm" rounded="md"
      bgColor="#AFCDCD"
      {...props}
    />
  )
}

export default BurgerButton