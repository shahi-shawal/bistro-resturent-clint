

const Title = ({heading, subheading}) => {
    return (
        <div className="flex flex-col  justify-center items-center mb-10">
            <p className="text-yellow-400 ">--- {subheading} ---</p>
            <h1 className="text-3xl font-bold uppercase border-y-2 p-4 mt-2">{heading}</h1>
        </div>
    );
};

export default Title;