"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//MUI components
import Grid from "@mui/material/Grid2";
import { Snackbar, Alert } from "@mui/material";

// Components
import ProductCard from "/components/card/ProductCard";
import Footer from "/layout/Footer";
import Loading from "/components/Loading";

//Services
import { getProducts, addToCart } from "/services/product";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProducts();
      setProducts(productData?.products);
      setCart(productData?.cart);
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const addToCartHandler = async (id, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }
      if (quantity === "") {
        setError(true);
        return;
      }
      const data = [
        ...cart,
        { productId: id, quantity: quantity, addedAt: Date.now() },
      ];
      setCart(data);
      await addToCart(data);
    } catch (e) {
      console.log("Error", e);
      return null;
    }
  };

  const isCardAddedHandler = (id) => {
    const item = cart?.find((item) => item.productId === id);
    return item;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          variant="filled"
        >
          Quantity can not be empty
        </Alert>
      </Snackbar>
      <Grid container spacing={1} sx={{ padding: "10px" }}>
        {products.length > 0 &&
          products?.map((product, i) => {
            return (
              <Grid size={{ xs: 12, md: 2 }} key={i}>
                <ProductCard
                  product={product}
                  onAddToCart={addToCartHandler}
                  isAdded={isCardAddedHandler(product?._id)}
                />
              </Grid>
            );
          })}
      </Grid>

      <Footer />
    </>
  );
};

export default ProductsPage;
