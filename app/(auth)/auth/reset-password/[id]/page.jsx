"use client";
import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import OutlinedInput from "@mui/material/OutlinedInput";

// Material UI imports
import { Paper, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { resetPassword } from "/services/user";
import AnimateButton from "/components/@extended/AnimateButton";

const ResetPassword = () => {
  const [isButtonLoading, setisButtonLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required("Enter password")
      .min(6, "Password is too short - should be 6 chars minimum."),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Type your password again"),
  });

  return (
    <>
      <Formik
        initialValues={{ password: "", re_password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          setisButtonLoading(true);
          const user = await resetPassword(values, id);
          setisButtonLoading(false);
          actions.resetForm();
          if (user.status === "success") {
            Swal.fire({
              title: "Success",
              text: "Password changed successfully.",
              icon: "success",
            });
            router.push("/auth/login");
          }
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <div className="full flex items-center justify-center mt-4 p-4">
            <Paper
              className="w-full md:w-1/4 md:mt-20 p-6 bg-slate-50"
              elevation={3}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <div className=" text-center text-xl font-semibold mb-2 pt-6">
                      Set your password
                    </div>
                    <div className="mt-6 mb-4 text-sm">
                      Hello user, please set your new password.
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      New password
                    </label>
                    <div>
                      <OutlinedInput
                        fullWidth
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <ErrorMessage
                        className="text-sm ml-1 mt-1"
                        style={{ color: "red" }}
                        name="password"
                        component="div"
                      />
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      Re-enter password
                    </label>
                    <div>
                      {/* <Input
                        placeholder="Re-enter password"
                        type="password"
                        name="re_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.re_password}
                      /> */}
                      <OutlinedInput
                        fullWidth
                        placeholder="Re-enter password"
                        type="password"
                        name="re_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.re_password}
                      />
                      <ErrorMessage
                        className="text-sm ml-1 mt-1"
                        style={{ color: "red" }}
                        name="re_password"
                        component="div"
                      />
                    </div>
                  </Grid>

                  <Grid className="mt-4 mb-4 pb-6" size={{ xs: 12, md: 12 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isButtonLoading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={
                          isButtonLoading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : null
                        }
                      >
                        <span className="text-white">Reset Password</span>
                      </Button>
                    </AnimateButton>
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

export default ResetPassword;
