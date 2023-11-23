import { FaEdit, FaTrash } from "react-icons/fa";
import Title from "../../../Components/Title/Title";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";


const Manageitem = () => {
    const [menu,refetch] = useMenu()
   const axiosSequre = useAxiosSequre()
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
          
          axiosSequre.delete(`/menu/${id}`)
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
    


    const handelMakeadmin=()=>{

    }
    return (
       <div>
         <div>
            <Title heading={"Manage All Item"} subheading={"hurry Up"}></Title>
            <div>
        <div className="flex justify-evenly mb-10">
        <h1 className="card-title">Total Menu : {menu.length}</h1>
        <h1 className="card-title">Total Price :$ {}</h1>
        </div>
        <div className="overflow-x-auto">
<table className="table ">
{/* head */}
<thead className="bg-gray-400">
  <tr>
  <th>#</th>
  <th>image</th>
    <th>Name</th>
    <th>Price</th>
    <th>Edit</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>

  {
    menu.map((item,index)=><tr key={item._id}>
        <td>
            {index+1}
        </td>
        <td>
      <div className="flex items-center gap-3 ">
       <div className="avatar">
      <div className="mask mask-circle w-16 h-16">
      <img  src={item.image} alt=""  />
      </div>
       </div>
      </div>
    </td>
    <td>
      <div className="flex items-center gap-3">
      {item.name}
      </div>
    </td>
    <td><div>
          <div className="font-bold">{item.price}</div>
        </div></td>
        <td><div>
        <button onClick={()=>handelMakeadmin(item)} className="btn btn-ghost text-white bg-green-500 btn-sm">
        <FaEdit />
      </button>
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
        </div>
       </div>
    );
};

export default Manageitem;