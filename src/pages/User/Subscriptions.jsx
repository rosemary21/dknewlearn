import React from 'react'
import Layout from '../../components/home/Layout'
import { Link } from 'react-router-dom'

const Subscriptions = () => {
  return (
    <Layout>
    <div className='cart-page'>
    <br /><br />
        <h1>Subscriptions</h1><br />
        
        <div className='section1'>
            <div>
  
    <p>No Subscriptions.</p><br /><br /><br />

    <Link to={'/home/my-courses'}><button className='primary-btn'>Back to Courses</button></Link>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Subscriptions