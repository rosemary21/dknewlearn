import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div>
        <Header />
        <main className="user-main-content">
          {children}
          
        <Footer />
        </main>
    </div>
  )
}

export default Layout