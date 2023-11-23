import { loadStripe } from "@stripe/stripe-js";
import Title from "../../../Components/Title/Title";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_METHOD_PK)
const Payment = () => {
    return (
        <div>
            <Title heading={"Payment"}></Title>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;