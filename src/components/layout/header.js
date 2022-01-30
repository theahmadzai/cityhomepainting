import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Image, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import NavLink from './nav-link'
import * as styles from './header.module.less'
import useSiteMetadata from '../../hooks/use-sitemetadata'

const NavLinks = props => (
  <nav {...props}>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/services">Services</NavLink>
    <NavLink href="/about">About</NavLink>
    <NavLink href="/contact">Contact</NavLink>
    <NavLink href="/free-estimate" bordered>
      Free Estimate
    </NavLink>
  </nav>
)

export default function Header() {
  const { name, title } = useSiteMetadata()
  const [visible, setVisible] = useState(false)

  return (
    <header className={styles.header}>
      <Link to="/">
        <Image src="/logo.png" height="64px" alt={title} preview={false} />
      </Link>

      <NavLinks className={styles.navDesktop} />

      <MenuOutlined
        className={styles.toggleNav}
        onClick={() => setVisible(true)}
      />

      <Drawer
        title={name}
        visible={visible}
        closeable={false}
        onClose={() => setVisible(false)}
      >
        <NavLinks className={styles.navMobile} />
      </Drawer>
    </header>
  )
}
