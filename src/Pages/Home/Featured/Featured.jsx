import Title from "../../../Components/Title/Title";
import feature from "../../../assets/home/featured.jpg"
const Featured = () => {
    return (
        <div style={{
            backgroundImage:`url(${feature})`,
            backgroundPosition:'cover',
            backgroundAttachment:"fixed",
                    }} className="hero-overlay bg-opacity-60">
            <Title subheading={"check it out"} heading={"featued items"}></Title>
            <div className="flex md:flex-row justify-center items-center gap-5 py-20 px-32">
                <div className="flex-1">
                <img src={feature} alt=""  />
                </div>
                <div className="flex-1 text-white">
                    <p>November 10, 2023</p>
                    <p className="uppercase">Where i get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium debitis asperiores quasi iure nulla molestiae ullam sed. Iusto repellendus, laboriosam a aspernatur quas optio quam odio porro voluptas officia, eaque blanditiis dolor. Minus porro, dolores cumque inventore fugiat sint maiores soluta quidem, odio molestias perferendis animi commodi voluptates ratione.</p>
                    <button className="btn btn-outline text-white border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;