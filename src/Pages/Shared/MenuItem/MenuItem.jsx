

const MenuItem = ({menus}) => {
    const {image,name, price, recipe}=menus
    return (
        <div>
           <div className="card group w-72 border border-2 p-4">
           <img src={image} className="rounded-xl group-hover:scale-110 transition" alt=""  />
            <div>
            <h1 className="text-xl font-bold mt-4 text-center">{name}</h1>
            <p className="text-sm text-center">{recipe}</p>
            <p className="text-center font-bold text-xl">${price}</p>
            </div>
           </div>
        </div>
    );
};

export default MenuItem;