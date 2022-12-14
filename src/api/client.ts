import axios from "axios";

const getURL = () =>{
  let url;
  switch(process.env.NODE_ENV) {
    case 'production':
      url = process.env.REACT_APP_API_PROD_URL
      break
    case 'development':
      url = process.env.REACT_APP_API_DEV_URL
      break
    default:
  }
  return url;
}

const client = axios.create({
  baseURL: getURL()
  });

export default client;