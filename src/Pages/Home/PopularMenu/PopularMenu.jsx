
import Title from "../../../Components/Title/Title";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";


const PopularMenu = () => {
    const [menu]= useMenu();
    const popular=menu.filter((menus)=> menus.category==="popular")
    // const [menu, setMenu]= useState([])
    // useEffect(()=>{
    //     fetch("menu.json")
    //     .then(res=> res.json())
    //     .then(data=>{
    //         const popularItems=data.filter((popular)=> popular.category ==="popular")
    //         setMenu(popularItems)
    //     } )
    // },[])
    return (
        <div>
            <Title heading={"From Our Menu"}
                   subheading={"Popular items"}
            >
            </Title>
           <div className="flex flex-row flex-wrap gap-4 mb-4">
            {
              popular.map((menus)=> <MenuItem key={menus._id} menus={menus}></MenuItem>)
            }
           </div>
           <Link to="/ourmenu"><button  className="btn btn-outline border-0 border-b-4 mx-auto mb-10">View All Menu</button></Link>
        </div>
    );
};

export default PopularMenu;