"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { userUpdate } from "/redux/slices/userSlice";

import { emailVerify } from "/services/user";

const EmailVerify = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmailFun = async () => {
      const verifyEmail = await emailVerify(id);
      if (verifyEmail?.status === "success") {
        localStorage.setItem("token", verifyEmail?.token);
        localStorage.setItem("user", JSON.stringify(verifyEmail?.data?.user));
        handleLogin();
        router.push("/");
      } else {
        router.push("/auth/login");
      }
    };
    verifyEmailFun();
  }, []);

  const handleLogin = () => {
    dispatch(userUpdate(true));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default EmailVerify;
