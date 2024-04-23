import { useEffect, useRef } from 'react';
import crypto from 'crypto-js';
import PropTypes from 'prop-types';
import Axios from 'axios';

// Function to load script and append in DOM tree.
const loadScript = src => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.log('error in loading razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});

const RenderRazorpay = ({
  orderId,
  keyId,
  keySecret,
  currency,
  amount,
}) => {
    console.log("in razorpay orderid ",orderId)
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  // To load Razorpay checkout modal script.
  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Options for the Razorpay checkout
    const options = {
      "key": keyId, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": currency,
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of the previous step.
      "handler": function (response) {
        handlePayment('success', response);
      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id;
      handlePayment('failed', response.error.description);
    });

    rzp1.open();
  };

  // Informing server about payment
  const handlePayment = async (status, orderDetails = {}) => {
    await Axios.post(`http://localhost:5001/paymentCapture`, {
      status,
      orderDetails,
    });
  };

  useEffect(() => {
    console.log('Initializing Razorpay...');
    displayRazorpay();
  }, []);

  return null;
};

export default RenderRazorpay;
