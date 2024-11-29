"use client";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Link from "next/link";
import OutlinedInput from "@mui/material/OutlinedInput";

// Material UI imports
import { Paper, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

// import { Input } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import ButtonWithLoader from "/components/Button/ButtonWithLoader";
import { forgotPassword } from "/services/user";
import AnimateButton from "/components/@extended/AnimateButton";

const ForgotPassword = () => {
  const [isButtonLoading, setisButtonLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Enter your email"),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          setisButtonLoading(true);
          const user = await forgotPassword({
            ...values,
            host: window.location.host,
            protocol: window.location.protocol,
          });
          setisButtonLoading(false);
          actions.resetForm();
          if (user.status === "success") {
            Swal.fire({
              title: "Success",
              text: "Password reset link sent to your email address.",
              icon: "success",
            });
          }
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <div className="full flex items-center justify-center mt-10 p-4">
            <Paper
              className="w-full md:w-1/4 md:mt-6 p-6 bg-slate-50"
              elevation={3}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <div className=" text-center text-xl font-semibold mb-2 pt-4">
                      Forgot Password
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2">
                      Email address
                    </label>

                    <div>
                      <OutlinedInput
                        fullWidth
                        name="email"
                        placeholder="Email address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <ErrorMessage
                        className="text-sm ml-1 mt-1"
                        style={{ color: "red" }}
                        name="email"
                        component="div"
                      />
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <div className="mt-4 text-sm">
                      You will receive an email, please click on the link to
                      reset your passowrd.
                    </div>
                  </Grid>

                  <Grid className="mt-4" size={{ xs: 12, md: 12 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isButtonLoading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="success"
                        startIcon={
                          isButtonLoading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : null
                        }
                      >
                        <span className="text-white">Send</span>
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid className="text-center pb-4" size={{ xs: 12, md: 12 }}>
                    <Link
                      className="text-center"
                      style={{ color: "blue", cursor: "pointer" }}
                      href="/auth/login"
                    >
                      <ArrowBackIcon /> Back to Login
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Paper>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
