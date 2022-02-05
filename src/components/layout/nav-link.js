import React from 'react'
import { Link } from 'gatsby'
import * as styles from './nav-link.module.less'

const NavLink = ({ href, children, bordered }) => {
  return (
    <Link
      to={href}
      className={`${bordered ? styles.bordered : ''} ${styles.link}`}
      activeClassName={styles.active}
    >
      {children}
    </Link>
  )
}

export default NavLink
