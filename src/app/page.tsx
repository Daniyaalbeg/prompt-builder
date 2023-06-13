// import { Inter } from 'next/font/google'
import { Nav } from "@/components/nav";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Link href="/dashboard" className="text-white">
          Sign in
        </Link>
        <TailwindIndicator />
      </main>
    </>
  );
}
