import axios from "axios";
import Swal from "sweetalert2";

export const userSignUp = async (userData) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user/signup`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const newUserData = response.data;
    return newUserData;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};
export const userSignIn = async (userData) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user/login`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const forgotPassword = async (userData) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user/forgotPassword`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const resetPassword = async (userData, token) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user/resetPassword/${token}`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const emailVerify = async (token) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user/emailVerify/${token}`,
      method: "post",
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const resendVerificationEmail = async (data) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user/resend-verification-email`,
      method: "post",
      data: data,
    };

    const response = await axios(request);
    return response;
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
      // footer: "Please try again.",
    });

    return null;
  }
};

export const getUser = async (token) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/user`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(request);
    return response.data;
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
      // footer: "Please try again.",
    });

    return null;
  }
};
