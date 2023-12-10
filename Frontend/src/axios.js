import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    authorization: localStorage.getItem('accessToken')
  }
});

axiosInstance.interceptors.response.use(
  (response) => { 
    return response
  },
  error => {
    let err = '';
    if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string') {
      err =  error.response.data.error;
    }

    if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'string') {
      err =  error.response.data.message;
    }

    if (error.response && error.response.data && typeof error.response.data === 'string') {
      err =  error.response.data;
    }

    err = err || 'Something went wrong!';
    toast.configure();
    toast(err, {
      position: "top-right",
      theme: "colored",
      type: 'error'
    });

    if (error.response.status === 401) {
      window.location.href = '/signin'
    }

    return Promise.reject(err);
  }
);


export default axiosInstance;
