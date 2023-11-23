import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/logo.png"
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaCartArrowDown } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";
const Navbar = () => {
  const {user, logOut}= useContext(AuthContext)
  const [isAdmin] = useAdmin()
  const [cart]= useCart()
    const navlinks = <>
       <NavLink to="/"><li><a>Home</a></li></NavLink>
       <NavLink to="/ourmenu"> <li><a>Our Menu</a></li></NavLink>
        <NavLink><li><a>Contact Us</a></li></NavLink>
        {
          user? <>  <NavLink to="/ourshop/salads"> <li><a>Our Shop</a></li></NavLink> </> : <Link to="/login"></Link>
        }
        {
          user && isAdmin &&  <NavLink to="/dashboard/adminhome"><li><a>DashBoard</a></li></NavLink>
        }
        {
          user && !isAdmin &&  <NavLink to="/dashboard/userhome"><li><a>DashBoard</a></li></NavLink>
        }
       <Link to="/dashboard/cart">
        <button className="btn btn-xs">
        <FaCartArrowDown />
  <div className="badge badge-secondary">+{cart.length}</div>
</button>
        </Link>
      
    </>
    const handelLogout=()=>{
      logOut()
      .then()
      .catch(error=> console.log(error))
    }
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-40 max-w-screen-xl bg-black text-white  bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 hover:text-yellow-400">
     {navlinks}
      </ul>
    </div>
    <img src={logo} className="h-10" alt=""  />
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 ">
      {navlinks}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user? <Link><a onClick={handelLogout} className="btn">LogOut</a></Link> : <Link to="/login"><a className="btn">Login</a></Link>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;