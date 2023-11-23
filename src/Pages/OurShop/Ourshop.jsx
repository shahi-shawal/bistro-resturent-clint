import { Helmet } from "react-helmet-async";
import orderimg from "../../assets/shop/banner2.jpg";
import Cover from "../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../Shared/FoodCard/FoodCard";
import { useParams } from "react-router-dom";

const Ourshop = () => {
    const categories= ["salads","pizzas","soups","desserts","drinks"]
    const {category}=useParams()
    const initialIndex= categories.indexOf(category)
    const [tabindex, settabindex]= useState(initialIndex)
    const [menu]= useMenu();
    const desetrs=menu.filter((menus)=> menus.category==="dessert")
    const pizzas=menu.filter((menus)=> menus.category==="pizza")
    const salads=menu.filter((menus)=> menus.category==="salad")
    const soups=menu.filter((menus)=> menus.category==="soup")
    const drinks=menu.filter((menus)=> menus.category==="drinks")

  return (
    <div>
      <Helmet>
        <title>BB RESTAURANT | OUR SHOP</title>{" "}
      </Helmet>
      <Cover img={orderimg} title={"Our shop"}></Cover>
      <Tabs defaultIndex={tabindex} onSelect={(index) => settabindex(index)}>
        <TabList >
            {
                categories.map((category,idx)=><Tab key={idx}>{category}</Tab>)
            }
         
        </TabList>
        <TabPanel >
            <div className="grid grid-cols-1 lg:grid-cols-4">
            {
                salads.map((menus)=> <FoodCard key={menus.id}menus={menus}></FoodCard>)
            }
            </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 lg:grid-cols-4">
        {
                pizzas.map((menus)=> <FoodCard key={menus.id}menus={menus}></FoodCard>)
            }
            </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 lg:grid-cols-4">
        {
                soups.map((menus)=> <FoodCard key={menus.id}menus={menus}></FoodCard>)
            }
            </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 mb-4">
        {
                desetrs.map((menus)=> <FoodCard key={menus.id}menus={menus}></FoodCard>)
            }
            </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 mb-4">
        {
                drinks.map((menus)=> <FoodCard key={menus.id}menus={menus}></FoodCard>)
            }
            </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Ourshop;
