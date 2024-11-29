"use client";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Material UI imports
import {
  Paper,
  Button,
  CircularProgress,
  Box,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

import Grid from "@mui/material/Grid2";

// Component
import AnimateButton from "/components/@extended/AnimateButton";
import CustomInput from "/components/Input/CustomInput";
import Loading from "/components/Loading";

// Utils
import { displayRazorpay } from "/utils/displayRazorpay";

// Services
import { getCartItems } from "/services/product";

const CheckoutPage = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getCart = async () => {
      const data = await getCartItems();
      setCart(data?.cart);
      const totalCartPrice = data?.cart?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setAmount(totalCartPrice);
      setLoading(false);
    };
    getCart();
  }, []);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too Short!")
      .max(50, "Name is too Long!")
      .required("Enter your name"),
    email: Yup.string().email("Enter valid email").required("Enter your email"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Enter your phone number"),
    address: Yup.string().required("Please enter your address"),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const paymentSuccessHandler = () => {
    console.log("Payment Successful");
    router.push("/success");
  };

  const loadingHanlder = () => {
    setLoading(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setError(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          setIsButtonLoading(true);
          if (amount > 500000) {
            setError(
              "Amount for test mode should not be greater than INR 5,00,000"
            );
          }
          values.amount = amount;
          values.cart = cart;
          await displayRazorpay(values, paymentSuccessHandler, loadingHanlder);
        }}
      >
        <div className="full flex items-center justify-center p-4">
          <Paper
            className="w-full md:w-1/2 p-6 bg-slate-50 relative"
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid container spacing={2}>
              {/* Product Overview Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ flex: 1, paddingRight: 2 }}>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Purchase Summary
                  </Typography>
                  {cart &&
                    cart.map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          alt={item.name}
                          src={item.image}
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            ₹ {item.price} x {item.quantity} = ₹{" "}
                            {item.price * item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Total Amount: ₹{" "}
                    {new Intl.NumberFormat("en-IN").format(amount?.toFixed(0))}
                  </Typography>
                </Box>
              </Grid>

              {/* User Information Form Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ flex: 1 }}>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <CustomInput
                          name="name"
                          label="Name"
                          placeholder="Full Name"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <CustomInput
                          name="email"
                          label="Email"
                          placeholder="Email Address"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <CustomInput
                          name="phone"
                          label="Phone"
                          placeholder="Phone Number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <CustomInput
                          name="address"
                          label="Address"
                          placeholder="Shipping Address"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }} className="mt-2">
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
                            <span className="text-white">
                              Continue to Payment
                            </span>
                          </Button>
                        </AnimateButton>
                      </Grid>
                    </Grid>
                  </Form>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Formik>
    </>
  );
};

export default CheckoutPage;
