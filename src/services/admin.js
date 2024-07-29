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

export const getAllCourses = async (pageNo = 0) => {

  const data = {
    "pageSize": 10,
    "pageNo": pageNo
  }
  try {
    const response = await axios.post(`${api_url}/course/all`, data, {
      headers: {
        'apiKey': `${token}`,
        'Content-Type': 'application/json'
      }
    }
    );

    return response.data

  } catch (error) {
    console.log("An error occurred. Please try again.");
  }
}

export const updateCourse = async (id, status) => {

  const data = {
    "status": status,
    "id":id
}

  try {
    const response = await axios.post(`${api_url}/course/process`, data, {
      headers: {
        'apiKey': `${token}`,
        'Content-Type': 'application/json'
      }
    }
    );

    return response.data

  } catch (error) {
    console.log("An error occurred. Please try again.");
  }
}