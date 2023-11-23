import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Config/firebase.config,";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
  const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()
   const [user, setUser]= useState(null)
   const [loading, setloading]= useState(true)


  const createUser =(email, password)=>{
    setloading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

 const login = (email, password)=>{
    setloading(true)
    return signInWithEmailAndPassword(auth, email, password)
 }

 const logOut = ()=>{
    setloading(true)
    signOut(auth)
 }

 const googlelogin =()=>{
  return signInWithPopup(auth, googleProvider)
 }
   useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser)
        const userInfo = {email: currentUser.email}
      if(currentUser){
             axiosPublic.post("/jwt", userInfo)  
             .then(res=>{
              if (res.data.token) {
                localStorage.setItem('access-token', res.data.token)
              }
             })
      }
      else{
          localStorage.removeItem('access token')
      }

        setloading(false)

        return()=>{
            return unSubscribe
        }
    })
   },[axiosPublic])



   const authInfo={
     user,
     loading,
     createUser,
     login,
     logOut,
     googlelogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
         {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;