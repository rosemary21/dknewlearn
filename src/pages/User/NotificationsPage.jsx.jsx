import React from 'react'
import Layout from '../../components/home/Layout'
import { Link } from 'react-router-dom'

const NotificationsPage = () => {
  return (
    <Layout>
    <div className='cart-page'>
    <br /><br />
        <h1>Notifications</h1><br />
        
        <div className='section1'>
            <div>
  
    <p>No notifications.</p><br /><br /><br />

    <Link to={'/home/my-courses'}><button className='primary-btn'>Back to Courses</button></Link>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default NotificationsPage