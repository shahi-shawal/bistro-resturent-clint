import useAuth from "../../../Hooks/useAuth";

const Userhome = () => {
    const  {user}= useAuth()
    return (
        <div>
            <div>
                <h1 className="text-3xl">
                  <span>Hi Welcome</span>
                  {
                    user?.displayName? <>{user.displayName}</>: "Back"
                  }
                </h1>
            </div>
        </div>
    );
};

export default Userhome;