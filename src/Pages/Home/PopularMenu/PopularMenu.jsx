import { useEffect, useState } from "react";
import Title from "../../../Components/Title/Title";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const PopularMenu = () => {
    const [menu, setMenu]= useState([])
    useEffect(()=>{
        fetch("menu.json")
        .then(res=> res.json())
        .then(data=>{
            const popularItems=data.filter((popular)=> popular.category ==="popular")
            setMenu(popularItems)
        } )
    },[])
    return (
        <div>
            <Title heading={"From Our Menu"}
                   subheading={"Popular items"}
            >
            </Title>
           <div className="flex flex-row flex-wrap gap-4 mb-4">
            {
                menu.map((menus)=> <MenuItem key={menus._id} menus={menus}></MenuItem>)
            }
           </div>
        </div>
    );
};

export default PopularMenu;