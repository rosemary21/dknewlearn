import React from 'react'
import Layout from '../components/home/Layout'

const Categories = () => {
  return (
    <Layout>
      <div className='categories-page'>
        <div>
          <h1>Categories</h1>
        </div><br />

        <div className='categories-list'>
          <p>Web Development</p>
          <p>Product Design</p>
          <p>Cybersecurity</p>
          <p>Web Development</p>

        </div>
      </div>
    </Layout>
  )
}

export default Categories