import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './layout.css'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div>
        <Header />

        <div className='mobile-nav'>
        <Link to={'/login'}><button>Login</button></Link>&emsp;
          <Link to={'/signup'}><button className='btn2'>Signup</button></Link>
        </div>
        <main className="user-main-content">
          {children}
          
        <Footer />
        </main>
    </div>
  )
}

export default Layout