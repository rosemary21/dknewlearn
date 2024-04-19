import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './layout.css'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {

  const [isAsideVisible, setIsAsideVisible] = useState(false);


  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <div>
        <Header onToggleAside={toggleAside} />

        

        {isAsideVisible && (

<div className='mobile-nav'>
<div className='sub-mobile-nav'>
  
<p className="nav-link">
  Categories
</p>


<p className="nav-link">
  Become a teacher
</p>
<br />
<p><Link to={'/login'}><button>Login</button></Link></p>
<p>  <Link to={'/signup'}><button className='btn2'>Signup</button></Link></p>
</div>
</div>
        )}
        <main className="user-main-content">
          {children}
          
        <Footer />
        </main>
    </div>
  )
}

export default Layout