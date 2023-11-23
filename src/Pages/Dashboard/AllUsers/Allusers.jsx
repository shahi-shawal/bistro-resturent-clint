import {useQuery} from  "@tanstack/react-query"
import useAxiosSequre from "../../../Hooks/useAxiosSequre";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
const Allusers = () => {
  const axiosSequre = useAxiosSequre()
    const {data:users=[], refetch} = useQuery({
      queryKey :["users"],
      queryFn: async()=>{
         const res= await axiosSequre.get("/users", {
          
         });
          return res.data;

      }
    })

    const handelMakeadmin=(item)=>{
      console.log(item)
      axiosSequre.patch(`/users/admin/${item._id}`)
      .then(res=>{
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: `${item.name} is admin now`,
            text: "Your file has been deleted.",
            icon: "success"
          }); 
        }
      })
    }
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
      
      axiosSequre.delete(`/users/${id}`)
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
    return (
        <div>
        <div className="flex justify-evenly mb-10">
        <h1 className="card-title">Total Users : {users.length}</h1>
        <h1 className="card-title">Total Price :$ {}</h1>
        </div>
        <div className="overflow-x-auto">
<table className="table ">
{/* head */}
<thead className="bg-gray-400">
  <tr>
  <th>#</th>
    <th>Name</th>
    <th>Price</th>
    <th>Role</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>

  {
    users.map((item,index)=><tr key={item._id}>
        <td>
            {index+1}
        </td>
    <td>
      <div className="flex items-center gap-3">
      {item.name}
      </div>
    </td>
    <td><div>
          <div className="font-bold">{item.email}</div>
        </div></td>
        <td><div>
       {
        item.role ==="admin"? "Admin": <button onClick={()=>handelMakeadmin(item)} className="btn btn-ghost text-white bg-green-500 btn-sm">
        <FaUsers />
      </button>
       }
        </div></td>
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

export default Allusers;