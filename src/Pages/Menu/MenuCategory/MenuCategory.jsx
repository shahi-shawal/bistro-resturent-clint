import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({items,img,title}) => {
    return (
        <div className="pt-8">
             {
                title && <Cover img={img} title={title}></Cover>
             }
            <div className="flex flex-row flex-wrap gap-4 mb-4">
            {
              items.map((menus)=> <MenuItem key={menus._id} menus={menus}></MenuItem>)
            }
           </div>
           <div className="mx-auto text-center">
          <Link to={`/ourshop/${title}`}> <button className="btn btn-outline border-0 border-b-4">Order Your Favourite Food</button></Link>

           </div>
        </div>
    );
};

export default MenuCategory;