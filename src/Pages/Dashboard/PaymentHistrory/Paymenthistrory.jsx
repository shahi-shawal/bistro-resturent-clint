import { useQuery } from "@tanstack/react-query";
import Title from "../../../Components/Title/Title";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";
import useAuth from "../../../Hooks/useAuth";


const Paymenthistrory = () => {
    const {user}= useAuth()
    const axiosSequre = useAxiosSequre()
    const {data: paymenthis=[]}= useQuery({
        queryKey:['payment_history', user.email],
        queryFn:async()=>{
           const res=await axiosSequre.get(`/payment/${user.email}`)
           console.log(res.data);
           return(res.data)
        }
    })
    return (
        <div>
            <Title heading={"Payment History"}></Title>
       
            <div className="flex justify-evenly mb-10">
        <h1 className="card-title">Total paymenthis : {paymenthis.length}</h1>
        <h1 className="card-title">Total Price :$ {}</h1>
        </div>
        <div className="overflow-x-auto">
<table className="table ">
{/* head */}
<thead className="bg-gray-400">
  <tr>
  <th>#</th>
    <th>Transition Id</th>
    <th>Date</th>
    <th>Price</th>
    <th>status</th>
  </tr>
</thead>
<tbody>

  {
    paymenthis.map((item,index)=><tr key={item._id}>
        <td>
            {index+1}
        </td>
        <td>
      <div className="flex items-center gap-3 ">
      {item.trasitionId}
      </div>
    </td>
    <td>
      <div className="flex items-center gap-3">
        {item.date}
      </div>
    </td>
    <td><div>
          <div className="font-bold">{item.price}</div>
        </div></td>
        <td><div>{item.status}
        </div></td>
    <th>
    </th>
  </tr>)
  }
  </tbody>

</table>
</div>
    </div>
       
       
    );
};

export default Paymenthistrory;