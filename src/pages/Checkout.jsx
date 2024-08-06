import React, { useEffect, useState } from 'react'
import Layout from '../components/home/Layout'
import { useLocation } from 'react-router-dom';
import { api_url, token } from '../config/config';
import axios from 'axios';
import { extractIds } from '../services/cart';
import checkmark from "../assets/checkmark.gif"
import error from "../assets/error.gif"
import loading from "../assets/loading.gif"

const Checkout = () => {
  const location = useLocation();
  const [id, setId] = useState(null);

  const [status, setStatus] = useState("loading")


  const processCheckout = async (reference) => {

    const data = {
      "reference": reference,
      "transactionDtoList": extractIds()
    }
    if (token) {
      try {
        const response = await axios.post(`${api_url}/customertransaction/add`, data, {
          headers: {
            'apiKey': `${token}`,
            'Content-Type': 'application/json'
          }
        }
        );

        console.log(response.data)



        if (response.data.responseDto.message == "Transaction Process Successfully") {
          console.log("success")

          setStatus("success")

          setTimeout(() => {
            window.location.href = "/home/my-courses"
          }, 5000)
        }

      } catch (error) {
        console.log("An error occurred. Please try again.");
      }
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const idParam = queryParams.get('reference');
    if (idParam) {
      setId(idParam);
      processCheckout(idParam)

      console.log(idParam)
    }
  }, [location.search]);

  return (
    <Layout>

      {status == "error" ? (
        <div className='checkout'>
          <div>
          <h2>Checkout Unsuccessful</h2><br />

<img src={error} alt="Error image" />

<p>An error ocuured while purchasing the course, please try refereshing the page</p>
          </div>
        </div>
      ) : status == "success" ? (
        <div className='checkout'>
            <div>
            <h2>Checkout Successful</h2><br />

            <img src={checkmark} alt="Successful image" />

            <p>You have purchased the courses successfully</p>
          </div>
        </div>
      ) : (
        <div className='checkout'>
        <div>
        <h2>Checkout In Progress</h2><br />

        <img src={loading} alt="Loading image" />

        <p>Loading...</p>
      </div>
    </div>
      )}

    </Layout>
  )
}

export default Checkout