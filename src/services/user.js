import axios from 'axios';
import { api_url, token } from "../config/config";


export const getUser = async () =>{
    try {
        const response = await axios.get(`${api_url}/user/allcourses`, {
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

export const getCourses = async () =>{

  const data = {
    "pageSize":10,
    "pageNo":0
}
  try {
      const response = await axios.post(`${api_url}/course/all`, data, {
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