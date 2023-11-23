import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSequre from "./useAxiosSequre";

const useAdmin = () => {
    const {user}= useAuth()
    const axoisSequre = useAxiosSequre()
    const {data:isAdmin, ispending:isAdminloading} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn: async()=>{
            const res = await axoisSequre.get(`/users/admin/${user.email}`)
             console.log(res.data)
            return res.data?.admin;
        }
        
    })
    return [isAdmin, isAdminloading]
};

export default useAdmin;