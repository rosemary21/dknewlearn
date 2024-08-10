import axios from 'axios';
import { api_url, token } from "../config/config";


export const getTutor = async () => {
  
  try {
    const response = await axios.get(`${api_url}/staff/staffid`, {
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


export const getTutorCourses = async (pageNo = 0) => {
  const data = {
    "pageSize": 10,
    "pageNo": pageNo
  }
  try {
    const response = await axios.post(`${api_url}/course/alltutor`, data, {
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

export const getTutorCoursesEarnings = async (pageNo = 0, id) => {
  const data = {
    "pageSize": 10,
    "pageNo": pageNo,
    id
  }
  try {
    const response = await axios.post(`${api_url}/course/boughtcourse`, data, {
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







