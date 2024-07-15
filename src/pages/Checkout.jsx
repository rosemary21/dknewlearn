import React, { useEffect, useState } from 'react'
import Layout from '../components/home/Layout'
import { useLocation } from 'react-router-dom';
import { api_url, token } from '../config/config';
import axios from 'axios';
import { extractIds } from '../services/cart';

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
            <div>Checkout</div>


            {status == "error" ? (
                <div>
                    error....
                </div>
            ) : status == "success" ? (
                <div>
                    success
                </div>
            ) : (
                <div>
                    loading...
                </div>
            )}

        </Layout>
    )
}

export default Checkout