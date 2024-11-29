import axios from "axios";
import Swal from "sweetalert2";

export const createOrder = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/payments/order`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios(request);
    return response?.data?.data;
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error.response) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage =
        "No response from server. Please check your internet connection.";
    } else {
      errorMessage = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });

    return null;
  }
};

export const successOrder = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/payments/success`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios(request);
    return response?.data?.data;
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error.response) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage =
        "No response from server. Please check your internet connection.";
    } else {
      errorMessage = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });

    return null;
  }
};
