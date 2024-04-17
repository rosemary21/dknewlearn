import React from 'react'

import globe from '../../assets/globe.png'

const Footer = () => {
  return (
    <footer>
    <div class="footer-up">
      <div class="footer-nav">
        <div>
          <p><a href="#">Teach on Udemy</a></p>
          <p><a href="#">Get the app</a></p>
          <p><a href="#">About us</a></p>
          <p><a href="#">Contact us</a></p>
        </div>
        <div>
          <p><a href="#">Careers</a></p>
          <p><a href="#">Blog</a></p>
          <p><a href="#">Help and Support</a></p>
          <p><a href="#">Affiliate</a></p>
        </div>
        <div>
          <p><a href="#">Terms</a></p>
          <p><a href="#">Privacy policy</a></p>
          <p><a href="#">Sitemap</a></p>
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