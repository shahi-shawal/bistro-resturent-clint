import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axoisSequre = axios.create({
    baseURL:"http://localhost:5001"
}) 
const useAxiosSequre = () => {
  const navigate = useNavigate()
  const {logOut} = useAuth()
    // request interceptor to add authoraization header for every sequre call to the api
    axoisSequre.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token')
        // console.log('request stoped by interceptos', token);
        config.headers.authoraization = `Bearer ${token}`
        return (config)
    },function(error){
        return Promise.reject(error)
    })
  //intercept 401/ 403 status
  axoisSequre.interceptors.response.use(function(response){
    return response
  },async (error)=>{
    const status = error.response.status
    // console.log("status error interceptor", status);
    if (status === 401 || status === 403) {
        await logOut()
        navigate("/login")
    }
    return Promise.reject(error)
})
    return axoisSequre
};

export default useAxiosSequre;