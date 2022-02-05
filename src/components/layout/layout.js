import React from 'react'
import { Helmet } from 'react-helmet'
import SEO from '../seo'
import Header from './header'
import Footer from './footer'
import * as styles from './layout.module.less'

export default function Layout({ children, ...props }) {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <SEO />
      <Header />
      <main className={styles.main} {...props}>
        {children}
      </main>
      <Footer />
    </>
  )
}
