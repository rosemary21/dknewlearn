import axios from 'axios';
import { api_url, token } from "../config/config";


export const getAdmin = async () =>{
    try {
        const response = await axios.get(`${api_url}/admin/adminid`, {
            headers: {
              'apiKey': `${token}`,
              'Content-Type': 'application/json'
            }}
        );
  
        return response.data
    
      } catch (error) {
        console.log("An error occurred. Please try again.");
      }
}