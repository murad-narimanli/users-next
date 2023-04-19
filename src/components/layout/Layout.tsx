import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'


interface layoutProps {
    children: ReactNode
    title:string
    metaDesc:string
}

export default function Layout(props:layoutProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main>
        {props.children}
      </main>
      <Footer/>
    </>
  )
}
