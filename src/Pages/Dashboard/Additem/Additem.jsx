import Title from "../../../Components/Title/Title";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";
const hosting_image_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const hosting_image_api=`https://api.imgbb.com/1/upload?key=${hosting_image_key}`
const Additem = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic()
  const axoisSequre = useAxiosSequre()
  const onSubmit = async(data) => {
    console.log(data);
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(hosting_image_api,imageFile,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    })
    if(res.data.success){
      const menuItem ={
        name :data.name,
        category : data.category,
        price: parseInt(data.price),
        image: res.data.data.display_url,
        recipe: data.recipe
      }
      const menuRes =await axoisSequre.post("/menu", menuItem)
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        alert("menu Add successFully")
      }
    }
    console.log(res.data);
  };
 
  return (
    <div>
      <Title heading={"Add an Item"} subheading={"whats a new"}></Title>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-5">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Recipe Name"
              required
              className="input input-bordered w-full "
            />
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category")}
                className="select select-bordered w-full "
              >
                <option disabled >
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register("price")}
                type="text"
                placeholder="price"
                required
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="form-control my-6">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
            {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="recipe details"
            ></textarea>
          </div>
          <div className="form-control my-6">
          <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
          </div>
          <button className="btn btn-outline" >Add item </button>
        </form>
      </div>
    </div>
  );
};

export default Additem;
