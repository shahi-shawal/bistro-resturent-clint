import { NavLink, Outlet } from "react-router-dom";
import { FaCalendar, FaCartArrowDown, FaHome, FaList, FaListAlt, FaRandom, FaShopify,FaUsers } from "react-icons/fa";
import logo from "../assets/logo/logo.png"
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Deshboard = () => {
    const [cart]= useCart()
   
    // TODO: get is admin value form database 
    const [isAdmin] = useAdmin()
    return (
        <div className="flex">
             <div className="w-64 min-h-screen bg-green-500">
                <img src={logo} className="text-white mb-3" alt=""  />
                {
                    isAdmin? <>
                      <ul className="menu">
                <li>
                        <NavLink to="/dashboard/adminhome"><FaHome className="text-2xl" /> Admin Home</NavLink></li>
                <li>
                        <NavLink to="/dashboard/additems"><FaList className="text-2xl" /> Add items</NavLink></li>
                    
                     <li>
                        <NavLink to="/dashboard/manageitems"><FaListAlt className="text-2xl" />Manage Items</NavLink></li>
                     <li>
                        <NavLink to="/dashboard/managebookings"><FaRandom className="text-2xl" />Manage Bookings</NavLink></li>
                     <li>
                        <NavLink to="/dashboard/allusers"><FaUsers className="text-2xl" />All users </NavLink></li>
                </ul>




                    </> :
                    <>
                      <ul className="menu">
                <li>
                        <NavLink to="/dashboard/userhome"><FaHome className="text-2xl" /> User Home</NavLink></li>
                <li>
                        <NavLink to="/dashboard/paymenthistory"><FaCalendar className="text-2xl" />Payment History</NavLink></li>
                    
                     <li>
                        <NavLink to="/dashboard/cart"><FaCartArrowDown className="text-2xl" /> My cart <span className="text-red-600 font-bold bg-white p-2">{cart.length}</span> </NavLink></li>
                     <li>
                        <NavLink to="/dashboard/review"><FaRandom className="text-2xl" /> Add Review</NavLink></li>
                     <li>
                        <NavLink to="/dashboard/bookings"><FaList className="text-2xl" /> My Bookings</NavLink></li>
                </ul>
                    </>
                }
                <hr></hr>
                <ul className="menu">
                    <li>
                        <NavLink to="/">
                            <FaHome className="text-2xl" />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ourshop/salads">
                            <FaShopify className="text-2xl" />Our shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ourmenu">
                            <FaListAlt className="text-2xl" />Our Menu</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
        
    );
};

export default Deshboard;