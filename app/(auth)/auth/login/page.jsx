"use client";
import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const Swal = require("sweetalert2");
import Link from "next/link";
import { useRouter } from "next/navigation";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch } from "react-redux";
import { userUpdate } from "/redux/slices/userSlice";

// Material UI imports
import {
  Paper,
  Button,
  CircularProgress,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";

// Services
import { userSignIn } from "/services/user";
import VerificationEmail from "/components/VerificationEmail/VerificationEmail";

// Extension
import AnimateButton from "/components/@extended/AnimateButton";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    borderRadius: "8px",
  },
}));

const Login = () => {
  const [isButtonLoading, setisButtonLoading] = useState(false);
  const [user, setUser] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Enter your email"),
    password: Yup.string().required("Enter password"),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  if (!isMounted) {
    return null; // or a loading state
  }

  const handleLogin = () => {
    dispatch(userUpdate(true));
  };

  return (
    <>
      {user && !user?.is_email_verified ? (
        <VerificationEmail email={user.email} />
      ) : (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            setisButtonLoading(true);
            const user = await userSignIn(values);
            if (user?.status === "success") {
              setUser(user?.data?.user);
              if (user?.data?.user?.is_email_verified) {
                localStorage.setItem("token", user?.token);
                localStorage.setItem("user", JSON.stringify(user?.data?.user));
                handleLogin();
                router.push("/");
              }
            }
            setisButtonLoading(false);
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
                      <div className="text-2xl font-semibold mb-2">Sign in</div>
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
                      <label className="block uppercase text-gray-500 text-xs font-bold mb-2">
                        Password
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

                    <Grid className="mt-2" size={{ xs: 12, md: 12 }}>
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
                          <span className="text-white"> Login</span>
                        </Button>
                      </AnimateButton>
                    </Grid>
                    <Grid
                      className="text-center text-sm"
                      size={{ xs: 12, md: 12 }}
                    >
                      <Link
                        style={{ color: "blue", cursor: "pointer" }}
                        href="/auth/forgot-password"
                      >
                        Forgot password{" "}
                      </Link>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }} className="text-center">
                      <Box
                        sx={{ display: "flex", alignItems: "center", my: 2 }}
                      >
                        <Divider sx={{ flexGrow: 1 }} /> {/* Left Divider */}
                        <Typography sx={{ mx: 2 }}>
                          Do not have an account?
                        </Typography>{" "}
                        {/* Text in the center */}
                        <Divider sx={{ flexGrow: 1 }} /> {/* Right Divider */}
                      </Box>
                      {/* Do not have an account? */}
                    </Grid>
                    <Grid className="mb-4" size={{ xs: 12, md: 12 }}>
                      <Link href="/auth/sign-up">
                        <AnimateButton>
                          <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="success"
                          >
                            Create an account
                          </Button>
                        </AnimateButton>
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              </Paper>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default Login;
