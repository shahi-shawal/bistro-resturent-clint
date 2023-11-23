import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
    const [disable,setDisable]= useState(true)
    const {login, googlelogin}= useContext(AuthContext)
    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])
    const handelValidedCaptacha=(e)=>{
          const user_captcha_value = e.target.value
          if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
          }
          else{
            setDisable(true)
          }
    }
    const handelLogin=e=>{
        e.preventDefault()
        const form =e.target
        const email = form.email.value
        const password = form.password.value 
        const loginData = {email, password}
        console.log(loginData);

        login(email, password)
        .then(result =>{
          console.log(result.user)
           navigate("/")
        })
        .catch(error=> console.error(error))
    }
    const handelGoogle=()=>{
      
        googlelogin()
        .then(result=> 
          {console.log(result.user)
            const googleuser={
              email : result?.user.email,
              name: result?.user.displayName
            }
          axiosPublic.post("/users", googleuser)
          .then(res=> {
            console.log(res.data);
            navigate("/")
          })
          
          })
        .catch(error=> console.error(error))
    }
    return (
        <div>
            <div>
            <div className="hero min-h-screen bg-base-200">
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <h1 className="text-3xl font-bold text-center">Log in Now</h1>
    
      <form onSubmit={handelLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
        <LoadCanvasTemplate />
          <input type="text" onBlur={handelValidedCaptacha} name="captcha" placeholder="Captcha" className="input input-bordered" required />
          <button  className='btn btn-outline btn-xs mt-2'>Validate</button>
        </div>
        <div className="form-control mt-6">
          <button disabled={disable} className="btn btn-primary">Login</button>
        </div>
        <h1>New Here? <Link to="/signup">Sign Up</Link></h1>
      </form>
      <div className="form-control mt-6">
          <button onClick={handelGoogle} className="btn btn-outline">Google Login</button>
        </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;