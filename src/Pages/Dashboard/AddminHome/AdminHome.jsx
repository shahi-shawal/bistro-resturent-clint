import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";


const AdminHome = () => {
    const {user}= useAuth()
    const axiosSequre = useAxiosSequre()
    const {data: adminState=[]}= useQuery({
        queryKey:['admin state'],
        queryFn:async()=>{
          const res =await axiosSequre.get("/adminStates")
          console.log(res.data)
          return res.data
        }
    })
    const {data: chartdata=[]}= useQuery({
        queryKey:['admin state'],
        queryFn:async()=>{
          const res =await axiosSequre.get("/orderSates")
          console.log(res.data)
          return res.data
        }
    })
    return (
        <div>
            <div>
                <h1 className="text-3xl">
                    <span className="mr-2">Hi Welcome</span> 
                    {
                        user?.displayName?<>{user.displayName}</>: "Back"
                    }
                </h1>
            </div>
            <div>
                <h1>Revenue: ${adminState.reveneu}</h1>
                <h1>user: ${adminState.user}</h1>
                <h1>Menu Item: ${adminState.menuItem}</h1>
                <h1>Orders: ${adminState.orders}</h1>
            </div>
            <div>
                <h1>category: ${chartdata.category}</h1>
                <h1>Quantity: ${chartdata.quantity}</h1>
                <h1>Menu Item: ${adminState.menuItem}</h1>
                <h1>Orders: ${adminState.orders}</h1>
            </div>
        </div>
    );
};

export default AdminHome;