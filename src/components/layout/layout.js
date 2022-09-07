import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'
import * as styles from './layout.module.less'

const Layout = ({ children, ...props }) => {
  return (
    <Fragment>
      <Header />
      <main className={styles.main} {...props}>
        {children}
      </main>
      <Footer />
    </Fragment>
  )
}

export default Layout
