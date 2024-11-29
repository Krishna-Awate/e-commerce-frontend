import axios from "axios";

// Services
import { createOrder, successOrder } from "/services/payment";

export const displayRazorpay = async (
  values,
  paymentSuccessHandler,
  loadingHanlder
) => {
  //Loading SDK
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed");
    return;
  }

  try {
    const data = await createOrder(values);
    const { id, amount, entity } = data;
    let options;
    if (entity === "order") {
      options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: amount,
        currency: "INR",
        order_id: id,
        name: "Krishna",
        description: "Test Transaction",
        image:
          "https://i.pinimg.com/originals/2a/ff/5d/2aff5d3ae14a89142c768228c5c2d4ec.png",
        // callback_url: `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/success`,
        // redirect: true,
        handler: async function (response) {
          const data = {
            orderCreationId: id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: amount,
            cart: values?.cart,
          };
          loadingHanlder(true);
          const result = await successOrder(data);
          if (result) {
            paymentSuccessHandler();
          }
        },
        prefill: {
          name: "Krishna Awate",
          email: "krishnaawate87@gmail.com",
          contact: "7020701627",
        },
        notes: {
          address: "Aurangabad Maharashtra",
        },
        theme: {
          color: "#3399cc",
        },
      };
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (e) {
    console.log("Error", e);
  }
};
