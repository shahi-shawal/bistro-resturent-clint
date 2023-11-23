import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminloading]= useAdmin()
    const location = useLocation()
    
    if (loading || isAdminloading) {
        return <progress className="progress w-56 text-center "></progress>
    }
   
    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default AdminRoute;