import axios from 'axios';
import { api_url, token } from "../config/config";


export const getUser = async () => {
  try {
    const response = await axios.get(`${api_url}/user/allcourses`, {
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

// export const getAllCourses = async () => {

//   const data = {
//     "pageSize": 10,
//     "pageNo": 0
//   }
//   try {
//     const response = await axios.post(`${api_url}/course/all`, data, {
//       headers: {
//         'apiKey': `${token}`,
//         'Content-Type': 'application/json'
//       }
//     }
//     );

//     return response.data

//   } catch (error) {
//     console.log("An error occurred. Please try again.");
//   }
// }

export const getCourses = async (pageNo = 0) => {

  const data = {
    "pageSize": 10,
    "pageNo": pageNo
  }
  if (token) {
    try {
      const response = await axios.post(`${api_url}/course/all/view/student/courses`, data, {
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
  } else{
    try {
      const response = await axios.post(`${api_url}/course/all/view/student/courses`, data, {
        headers: {
          // 'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      }
      );

      return response.data

    } catch (error) {
      console.log("An error occurred. Please try again.");
    }
  }
}

export const getSingleCourse = async (id) => {

  try {

    if (token) {
      const response = await axios.get(`${api_url}/course/singlecourse/${id}`, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      }
      );

      return response.data

    } else {

      const data = {
        "courseId":id
    }

      const response = await axios.post(`${api_url}/course/view/singlecourse`, data, {
        headers: {
          // 'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      }
      );

      return response.data
    }

  } catch (error) {
    console.log("An error occurred. Please try again.");
  }
}