import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import {  useLocation, useNavigate } from "react-router-dom";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";
import useCart from "../../../Hooks/useCart";




const FoodCard = ({menus}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [,refetch]= useCart()
    const axoisSequre = useAxiosSequre()
    const {image,name, price, recipe, _id}=menus
    const {user}= useAuth()
    const handelCart=(food)=>{
      console.log(food);

      if (user && user.email) {
        // ToDo :m;k;l
        const Cartitem = {
            menuId : _id,
            email: user.email,
            name, price, recipe, image
        }
        axoisSequre.post('/carts', Cartitem)
            .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    title: `${name} added to your Cart`,
            text: "",
            icon: "success"
                })
                refetch()
            }
            
        })
      }
      else{
        Swal.fire({
            title: "Please Log in to add to the cart",
            text: "You clicked the button to login!",
            icon: "error"
          }).then(result=>{
            if(result.isConfirmed){
                navigate("/login", {state:{from:location}})
            }
          });
      }
    }
        return (
        <div className="">
            <div className="card group w-72 border border-2 p-4">
           <img src={image} className="rounded-xl group-hover:scale-110 transition" alt=""  />
           <p className="text-sm text-center mt-2 mb-2 absolute right-6 bg-black text-white">${price}</p>
            <div>
            <h1 className="text-xl font-bold mt-4 text-center">{name}</h1>
            <p className="text-sm text-center">{recipe}</p>
            <div className="mx-auto text-center">
            <button onClick ={()=> handelCart(menus)} className="btn btn-outline">Add to Cart</button>
            </div>
            </div>
           
           </div>
        </div>
    );
};

export default FoodCard;