"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Services
import { getCartItems, removeCartItems, addToCart } from "/services/product";

//Components
import CartItem from "/components/card/CartItem";
import Loading from "/components/Loading";

const Cart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const getCartData = async () => {
      const data = await getCartItems();
      setCartItems(data?.cart);
      setLoading(false);
    };
    getCartData();
  }, []);

  if (!isMounted) {
    return null;
  }

  // Update quantity in cartItems
  const updateQuantityHandler = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.productId === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove items from cart
  const removeCartItemsHandler = async (id) => {
    try {
      const items = cartItems.filter((product) => {
        return product.productId !== id;
      });
      setCartItems(items);
      await removeCartItems(id);
    } catch (e) {
      console.log("error", e);
    }
  };

  // Get total price of cart items
  const totalCartPrice = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkoutRouteHandler = async () => {
    setIsButtonLoading(true);
    await addToCart(cartItems);
    router.push("/checkout");
    setIsButtonLoading(false);
  };

  const productRouteHandler = () => {
    router.push("/");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!cartItems || cartItems?.length <= 0 ? (
        <div className="font-semibold text-lg flex justify-center mt-20 p-4 text-center">
          Your cart is empty. Please add items from product page.
        </div>
      ) : (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333", marginBottom: "20px" }}
          >
            Your Shopping Cart
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.map((product, i) => (
                  <CartItem
                    key={i}
                    product={product}
                    onUpdateQuantity={updateQuantityHandler}
                    onRemoveCartItems={removeCartItemsHandler}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} align="right">
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Total Cart Price:
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#388e3c" }}
                    >
                      ₹{" "}
                      {new Intl.NumberFormat("en-IN").format(
                        totalCartPrice?.toFixed(0)
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <Box sx={{ marginTop: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              className="py-4 px-6"
              onClick={checkoutRouteHandler}
              disabled={isButtonLoading}
              startIcon={
                isButtonLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : null
              }
            >
              Checkout
            </Button>
            <Button
              variant="outlined"
              className="p-4"
              color="secondary"
              onClick={productRouteHandler}
            >
              Continue Shopping
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};

export default Cart;
