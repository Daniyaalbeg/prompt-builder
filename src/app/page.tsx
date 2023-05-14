// import { Inter } from 'next/font/google'
import { Nav } from '@/components/nav'
import { TailwindIndicator } from '@/components/tailwind-indicator'

export default function Home() {
  return (
    <>
    <Nav />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TailwindIndicator />
    </main>
    </>
  )
}
