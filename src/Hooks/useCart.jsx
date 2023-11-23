import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";
import useAuth from "./useAuth";


const useCart = () => {
    const axoisSequre= useAxiosSequre()
    const {user}= useAuth()
    console.log(user);
    const {refetch,data:cart =[]}= useQuery({
        queryKey:["cart", user?.email],
        queryFn: async ()=>{
            const res = await axoisSequre.get(`/carts?email=${user.email}`)
            return res.data
        }
    })
   

    
    return [cart, refetch]
};

export default useCart;