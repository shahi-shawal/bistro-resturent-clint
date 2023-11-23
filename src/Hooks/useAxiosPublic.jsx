import axios from "axios";
const axoisPublic = axios.create({
    baseURL:"http://localhost:5001"
}) 
const useAxiosPublic = () => {
    return axoisPublic
};

export default useAxiosPublic;