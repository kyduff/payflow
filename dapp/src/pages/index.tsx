import { VStack, Heading, Button, Center, Box, Flex, Stack} from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import ImageBackgroundComponent from '@/components/background'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ImageBackgroundComponent>
      <Flex
      height="100vh" // Adjust this to control the height of the centered area
      align="center" // Vertically center items
      justify="center" // Horizontally center items
      >
      <VStack>
      <Heading as='h2' size='lg' color='white'>
        Use Payflow to send fiat with your crypto wallet
      </Heading>
      <Button size='lg' colorScheme='purple' mt='24px'>
      <Link href={"/pay?amount=1.50&iban=DE92%201001%201001%202621%203427%2045&companyName=Jan%20Ole%20Ernst&memo=Caf%C3%A9%20au%20lait"}>
        Make a payment
      </Link>
      </Button>
      </VStack>
      </Flex>
      </ImageBackgroundComponent> 
    </>
  )
}


