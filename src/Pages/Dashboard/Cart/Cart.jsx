import { FaTrash } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch]= useCart()
    const axiosSequre = useAxiosSequre()
    const totalPrice = cart.reduce((total,item)=> total+item.price,0);
    console.log(totalPrice)

    const handelDelete=(id)=>{
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            
            axiosSequre.delete(`/carts/${id}`)
            .then(res=> {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });  
              
                }
            })
            }
          });
    }
    return( 
        <div>
            <div className="flex justify-evenly mb-10">
            <h1 className="card-title">Total Orders : {cart.length}</h1>
            <h1 className="card-title">Total Price :$ {totalPrice}</h1>
           { cart.length?
            <Link to="/dashboard/payment"><button  className="btn btn-outline px-8">Pay</button></Link>
            :
            <button disabled className="btn btn-outline px-8">Pay</button>
          }
            </div>
            <div className="overflow-x-auto">
  <table className="table ">
    {/* head */}
    <thead className="bg-gray-400">
      <tr>
      <th>#</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {
        cart.map((item,index)=><tr key={item._id}>
            <td>
                {index+1}
            </td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td><div>
              <div className="font-bold">{item.name}</div>
            </div></td>
            <td>
        {item.price}
        </td>
        <th>
          <button onClick={()=>handelDelete(item._id)} className="btn btn-ghost text-white bg-red-500 btn-sm">
            <FaTrash />
          </button>
        </th>
      </tr>)
      }
      </tbody>
    
  </table>
</div>
        </div>
    );
};
export default Cart;