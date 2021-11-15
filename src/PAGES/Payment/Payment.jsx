import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  useElements,
  useStripe,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import MetaData from "./../../Components/MetaData/MetaData";
import CustomizedSteppers from "./../../Utils/Stepper/Stepper";
import {
  BsCreditCard2FrontFill,
  BsFillKeyFill,
  BsCalendar2DateFill,
} from "react-icons/bs";
import "./payment.css";
import { useAlert } from "react-alert";
import { authAxios } from "../../Utils/Axios/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { clearErrors, createOrder } from "./../../REDUX/Actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const elements = useElements();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const paymentAmount = JSON.parse(sessionStorage.orderInfo);
  const paybtn = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.orders);

  const paymentData = {
    amount: Math.round(paymentAmount.totalPrice * 100),
  };
  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    user: user._id,
    paidAt: Date.now(),
    paymentInfo: "",
    priceBreakdown: sessionStorage.orderInfo
      ? JSON.parse(sessionStorage.orderInfo)
      : "",
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    paybtn.current.disbled = true;
    setIsLoading(true);
    try {
      const { data } = await authAxios.post(
        "/api/v1/payment/process",
        paymentData
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.street,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipcode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        paybtn.current.disbled = false;
        setIsLoading(false);

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert.success("Payment Successful");
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          localStorage.removeItem("cart");
          dispatch(createOrder(orderData));
          if (!error) {
            history.push("/order/success");
          }
        } else {
          paybtn.current.disbled = false;
          setIsLoading(false);

          alert.error("There is some issue while processing payment");
        }
      }
    } catch (error) {
      paybtn.current.disbled = false;
      setIsLoading(false);
      console.log(error);
      alert.error(error.response.data.message || error.message || error);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CustomizedSteppers activeStep={2} />
      <div className="paymentContainer">
        <form action="" className="paymentForm" onSubmit={submitHandler}>
          <h3>Payment Info</h3>

          <div>
            <BsCreditCard2FrontFill />
            <CardNumberElement className="cardInput" />
          </div>
          <div>
            <BsCalendar2DateFill />
            <CardExpiryElement className="cardInput" />
          </div>
          <div>
            <BsFillKeyFill />
            <CardCvcElement className="cardInput" />
          </div>

          <button ref={paybtn} className="payBtn">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
