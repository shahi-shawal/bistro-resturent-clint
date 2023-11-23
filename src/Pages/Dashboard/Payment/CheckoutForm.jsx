import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState,useEffect } from "react";
import useAxiosSequre from "../../../Hooks/useAxiosSequre";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";

const CheckoutForm = () => {
    const stripe = useStripe()
    const {user}= useAuth()
    const [error, setError]= useState("")
    const [transition, setTransition]= useState('')
    const [clientSecret, setClientSecret]= useState('')
    const elements = useElements()
    const axiosSequre = useAxiosSequre()
    const [cart, refetch]= useCart()
    const totalPrice = cart.reduce((total,item)=>total+item.price,0)

    useEffect(()=>{
        if(totalPrice > 0){
          axiosSequre.post('/create-payment-intent', {price:totalPrice})
        .then(res=>{
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret)
        })
        }
      },[axiosSequre, totalPrice])

   const handelSubmit=async(event)=>{
    event.preventDefault()
     if(!stripe || !elements){
        return
     }
     const card = elements.getElement(CardElement)
   if (card===null) {
    return
   }
   const {error, paymentMethod} = await stripe.createPaymentMethod({
    type:"card",
    card
   })
   if (error) {
    setError(error.message)
    console.log("payment error", error);
   }
   else{
    console.log("payment method", paymentMethod);
    setError('')
   }
  
//confirm payments 
 const {paymentIntent, error: confirmError}= await stripe.confirmCardPayment(clientSecret, {
  payment_method:{
    card:card,
    billing_details:{
      email: user?.email || 'anonyms',
      name:user.displayName || 'anonyms'
    }
  }
 })
 if (confirmError) {
  console.log('confirm error');
 }
 else{
  console.log(paymentIntent,"payment intent");
  if(paymentIntent.status==="succeeded"){
    console.log("tansation id", paymentIntent.id);
             setTransition( paymentIntent.id);
    
    const payment={
      email: user.email,
      price:totalPrice,
      date: new Date(), ///useing mommentjs utc
      trasitionId : paymentIntent.id,
      cartId : cart.map(item=> item._id),
      menuItemId : cart.map(item=> item.menuId),
      status:"pending"

    }

    const res = await axiosSequre.post('/payment', payment)
    console.log("payment saved", res.data);
    refetch()
    if(res.data.paymentResult.insertedId){
      alert("THanks for your transition")
    }
  }
 }



   }

   
    return (
        <form onSubmit={handelSubmit}>
         <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <p className="text-xl font-bold text-red-500">{error}</p>
      {
        transition &&  <p className="text-2xl font-bold text-green-400">Transition id: {transition}</p>
      }
      <button className="btn btn-sm bg-green-400 my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
        </form>
    );
};

export default CheckoutForm;