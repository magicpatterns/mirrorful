import Head from 'next/head'
import { Tokens } from './../../.mirrorful/theme.js'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mirrorful + Tailwind + Next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello world from a Nextjs app with Mirrorful and Tailwind!</h1>
        <h2 className="text-purple-400">
          This uses Tailwind + Mirrorful. Custom Acme Inc. Purple Color!
        </h2>
        <h2 style={{ color: Tokens['colors']['green-2'][800] }}>
          This is a regular JS + Mirrorful usage. Not tailwind.
        </h2>
      </main>
    </>
  )
}
