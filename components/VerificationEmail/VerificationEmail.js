"use client";
import React from "react";
// Material UI imports
import { Paper } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Swal from "sweetalert2";

import { resendVerificationEmail } from "/services/user";

const VerificationEmail = ({ email }) => {
  const resendVerificationHandler = async () => {
    try {
      const data = {
        email: email,
        host: window.location.host,
        protocol: window.location.protocol,
      };
      const resend = await resendVerificationEmail(data);
      const res = resend.data;
      if (resend.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Verification Email Resent",
          text: res.message,
        });
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div>
      <div className="full flex items-center justify-center p-4 mt-20">
        <Paper className="w-full md:w-auto p-6 bg-slate-50" elevation={3}>
          <div className="flex justify-center mb-4">
            <EmailIcon style={{ fontSize: 50, color: "#0063b0" }} />
          </div>
          <div className="flex justify-center font-sans font-bold mb-4">
            Verify Email
          </div>
          <div className="flex justify-center mb-6 font-sans">
            A verification email has been sent to email address {email}.
          </div>
          <div className="flex justify-center font-sans mb-4">
            Click the link in the email to verify your account
          </div>
          <div>
            {/* <div
              className="flex justify-center text-blue-500 hover:underline hover:cursor-pointer"
              onClick={loginHandler}
            >
              Click here to login with other email.
            </div> */}
            <div
              onClick={resendVerificationHandler}
              className="flex justify-center text-blue-500 hover:underline hover:cursor-pointer mt-8 pb-4"
            >
              Didn not receive email? Click here to send again.
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default VerificationEmail;
