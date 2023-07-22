import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

export default function AccordionBalance(balance: any, tokenName: any) {
  return(
    <AccordionButton>
    <Box as="span" flex='1' textAlign='left'>
      {balance}: {tokenName}
    </Box>
    <AccordionIcon />
  </AccordionButton>
  )
}