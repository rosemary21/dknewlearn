import React from 'react'
import Layout from '../components/home/Layout'

const SingleCoursePage = () => {
  return (
    <Layout>
    <div className='course-page'>
      <div className='course-banner'>
        <div className="breadcrumb">
        Development {'>'}
Programming Languages {'>'}
Python
        </div>
        <h1>
        100 Days of Code: The Complete Python Pro Bootcamp
        </h1>

        <p>Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!</p>
      </div>

      <div className="sections">
      <div className="section1">
        <h1>What you'll learn</h1>
        <div className="sub-points">
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        </div>
      </div>
      </div>
    </div>
    </Layout>
  )
}

export default SingleCoursePage