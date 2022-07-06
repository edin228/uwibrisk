import React from 'react'
import DesktopHeader from './desktop/DesktopHeader'
import MobileHeader from './mobile/MobileHeader'

function Header() {
  return (
    <>
        <DesktopHeader />
        <MobileHeader />
    </>
  )
}

export default Header