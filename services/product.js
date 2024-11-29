import axios from "axios";
import Swal from "sweetalert2";

export const getProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/products/${userId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const addToCart = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/add-cart`,
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

export const getCartItems = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cart`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,
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

export const removeCartItems = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cart/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
