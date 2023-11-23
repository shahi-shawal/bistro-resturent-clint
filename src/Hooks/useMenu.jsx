// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSequre from "./useAxiosSequre";


const useMenu = () => {
    const axiosSequre = useAxiosSequre()
    // const [menu, setMenu]= useState([])
    // const [loading , setloading]= useState(true)
    // useEffect(()=>{
    //     fetch("http://localhost:5001/menu")
    //     .then(res=> res.json())
    //     .then(data=>{
    //         setMenu(data)
    //         setloading(false)
    //     })
    // },[])

   const {data:menu=[], refetch, isPending}= useQuery({
    queryKey:['menu'],
    queryFn:async()=>{
        const res = await axiosSequre.get("/menu")
        console.log (res.data)
        return res.data
    }
   })



    return [menu,refetch, isPending]
};

export default useMenu;