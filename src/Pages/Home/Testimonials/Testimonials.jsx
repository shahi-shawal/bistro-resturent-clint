import Title from "../../../Components/Title/Title";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
const Testimonials = () => {
    const [review, setreview]= useState([])
    useEffect(()=>{
        fetch('reviews.json')
        .then(res=> res.json())
        .then(data=> setreview(data))
    },[])
    return (
        <div className="mt-5 my-20">
            <Title subheading={"What our client Say"} heading={"Testimonial"}></Title>
             <div>
             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       {
        review.map((reviews)=> <SwiperSlide key={reviews._id}>
            <div className="m-24">
            <ReactStars
    count={reviews.rating}
    size={30}
    color="#FACC15"
    classNames="mx-auto"
  />
                <p>{reviews.details}</p>
                <h1 className="text-3xl text-center text-yellow-400">{reviews.name}</h1>
            </div>
        </SwiperSlide>)
       }
      </Swiper>
             </div>
        </div>
    );
};

export default Testimonials;