import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer>
      <div className="footer-up">
        <div className="footer-nav">
          <div>
            <div>
              <h1 style={{ color: 'var(--color2)' }}>DK Learning</h1><br />
              <p style={{ fontSize: '20px', color: "white"}}>The best online learning platform</p><br />
            </div>
          </div>
          <div className="sub-footer-nav">
          <div>
            <p><Link to={'/teaching'}>Teach on DK Learning</Link></p>
            <p><a href="#">About us</a></p>
            <p><a href="#">Contact us</a></p>
          </div>
          <div>
            <p><a href="#">Terms</a></p>
            <p><a href="#">Privacy policy</a></p>
            <p><a href="#">Accessibility statement</a></p>
          </div>
          </div>
        </div>


      </div>

      <div className="footer-down">

        <div style={{ textAlign: "center"}}>
          <p>All right reserved © 2024 DK Learning.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer