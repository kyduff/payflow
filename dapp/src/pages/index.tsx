import { VStack, Heading, Button, Center, Box, Flex} from '@chakra-ui/react'
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
      <Heading as='h2' size='lg' colorScheme='teal'>
        Use Payflow to send fiat with your crypto wallet
      </Heading>
      <Button size='lg' colorScheme='teal' mt='24px'>
      <Link href={"/login"}>Launch App </Link>
      </Button>
      </VStack>
      </Flex>
      </ImageBackgroundComponent> 
    </>
  )
}


