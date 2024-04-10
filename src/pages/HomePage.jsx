import React from 'react'
import Layout from '../components/home/Layout'

import background from "../assets/background.jpg"

const HomePage = () => {
  return (
    <div>
        <Layout>
            <img src={background} alt=""  />

            Homepage
        </Layout>
    </div>
  )
}

export default HomePage