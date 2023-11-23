import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Ourshop from "../Pages/OurShop/Ourshop";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import Deshboard from "../LayOut/Deshboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import Allusers from "../Pages/Dashboard/AllUsers/Allusers";
import Additem from "../Pages/Dashboard/Additem/Additem";
import AdminRoute from "./AdminRoute";
import Manageitem from "../Pages/Dashboard/ManageItem/Manageitem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Paymenthistrory from "../Pages/Dashboard/PaymentHistrory/Paymenthistrory";
import AdminHome from "../Pages/Dashboard/AddminHome/AdminHome";
import Userhome from "../Pages/Dashboard/UserHome/Userhome";

const routes = createBrowserRouter([
    {
    path:"/",
    element:<Main></Main>,
    children:[{
        path:"/",
        element:<Home></Home>
    },
    {
        path:"/ourmenu",
        element:<Menu></Menu>
    },
    {
        path:"/ourshop/:category",
        element:<Ourshop></Ourshop>
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/signup",
        element:<SignUp></SignUp>

    }

]
},
{
    path:"/dashboard",
    element:<Deshboard></Deshboard>,
    children:[{
        //normal routes
        path:"cart",
        element:<Cart></Cart>
    },
    {
        path:"userhome",
        element:<Userhome></Userhome>
    },
    {
        path:"payment",
        element:<Payment></Payment>
    },
    {
        path:"paymenthistory",
        element:<Paymenthistrory></Paymenthistrory>
    },
    /// adminOnly Routes
    {
      path:"adminhome",
      element:<AdminHome></AdminHome>
    },
    {
        path:"allusers",
        element:<AdminRoute><Allusers></Allusers></AdminRoute>
    },
    {
        path:"additems",
        element:<AdminRoute><Additem></Additem></AdminRoute>
    },
    {
        path:"manageitems",
        element:<AdminRoute><Manageitem></Manageitem></AdminRoute>
    }




]
}

])

export default routes;