import Head from 'next/head'
import PageHome from '@/components/pages/page-home'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard - ByGameList</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHome />
    </>
  )
}
