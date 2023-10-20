import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe(
  "pk_test_51Nf5G5SEwkmLhDCHXkoMPhQxzuYn1sIYnFiC1juWNKgha1nei99iD5pwO8z0tBclrG26Tw34HmL2gd5rE1cdvCGm00wpBx3SWS"
);

function Stripe({ amount }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} />
    </Elements>
  );
}

export default Stripe;
