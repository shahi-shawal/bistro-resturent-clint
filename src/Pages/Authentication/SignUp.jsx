import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
const SignUp = () => {
    const axoisPublic = useAxiosPublic()
    const captchaRef = useRef(null)
    const navigate = useNavigate()
    const [disable,setDisable]= useState(true)
    const {createUser}= useContext(AuthContext)
    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])
    const handelValidedCaptacha=()=>{
          const user_captcha_value = captchaRef.current.value
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
        const name= form.name.value
        const loginData = {email, password, name}
        console.log(loginData);

       
        


         createUser(email, password)
        .then(result =>{
          console.log(result.user)
        
          axoisPublic.post("/users", loginData)
          .then(res=> {
            if(res.data.insertedId){
              alert("log in successFully")
            }
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
    <h1 className="text-3xl font-bold text-center">Sign up Now</h1>
    
      <form onSubmit={handelLogin} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
        </div>
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
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo url</span>
          </label>
          <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
        <LoadCanvasTemplate />
          <input type="text" ref={captchaRef} name="captcha" placeholder="Captcha" className="input input-bordered" required />
          <button onClick={handelValidedCaptacha} className='btn btn-outline btn-xs mt-2'>Validate</button>
        </div>
        <div className="form-control mt-6">
          <button disabled={disable} className="btn btn-primary">Sign Up</button>
        </div>
        <h1>Alrady Have an account? <Link to="/login">Login</Link></h1>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default SignUp;