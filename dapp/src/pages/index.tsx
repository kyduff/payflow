import { VStack } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <VStack>
      <h1>payflow</h1>
      <Link href={"/login"}>Login</Link>
    </VStack>
  )
}
