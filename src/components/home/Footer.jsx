import React from 'react'

import globe from '../../assets/globe.png'

const Footer = () => {
  return (
    <footer>
    <div class="footer-up">
      <div class="footer-nav">
        <div>
          <p><a href="#">Teach on DK Learning</a></p>
          <p><a href="#">About us</a></p>
          <p><a href="#">Contact us</a></p>
        </div>
        <div>
          <p><a href="#">Terms</a></p>
          <p><a href="#">Privacy policy</a></p>
          <p><a href="#">Accessibility statement</a></p>
        </div>
      </div>

      <div class="globe">
        <a href="#"><img src={globe} alt="" />English</a>
      </div>
    </div>

    <div class="footer-down">
      <div>
        <h1 style={{ color: 'var(--color2)'}}>DK Learning</h1>
      </div>
      <div>
        <p>© 2024 DK Learning.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer