import { Helmet } from "react-helmet-async";
import menuimg from "../../assets/menu/banner3.jpg"
import menuimg1 from "../../assets/menu/dessert-bg.jpeg"
import menuimg2 from "../../assets/menu/salad-bg.jpg"
import menuimg3 from "../../assets/menu/soup-bg.jpg"
import menuimg4 from "../../assets/menu/pizza-bg.jpg"
import Cover from "../Shared/Cover/Cover";
import useMenu from "../../Hooks/useMenu";
import Title from "../../Components/Title/Title";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
    const [menu]= useMenu();
    const desetrs=menu.filter((menus)=> menus.category==="dessert")
    const pizzas=menu.filter((menus)=> menus.category==="pizza")
    const salads=menu.filter((menus)=> menus.category==="salad")
    const soups=menu.filter((menus)=> menus.category==="soup")
    const offers=menu.filter((menus)=> menus.category==="offered")
    return (
        <div>
            <Helmet>
        <title>BB RESTAURANT | OUR MENU</title>
      </Helmet>
      <Cover img={menuimg} title={"our menu"}></Cover>
      <Title subheading={"Don't miss todays offer"} heading={"todays's offer"}></Title>
      <MenuCategory items={offers}></MenuCategory>
      <MenuCategory items={desetrs} img={menuimg1} title={"desserts"}></MenuCategory>
      <MenuCategory items={pizzas} img={menuimg4} title={"pizzas"}></MenuCategory>
      <MenuCategory items={salads} img={menuimg2} title={"salads"}></MenuCategory>
      <MenuCategory items={soups} img={menuimg3} title={"soups"}></MenuCategory>
        </div>
    );
};

export default Menu;