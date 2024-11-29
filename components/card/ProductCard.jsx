import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";

const ProductCard = ({ product, onAddToCart, isAdded }) => {
  const [quantity, setQuantity] = useState(1);

  const quantityChangeHandler = (event) => {
    let value = event.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    if (isNaN(value)) {
      return;
    }
    value = Number(value);
    const quantity = Math.max(1, Math.min(product?.stock, value));
    setQuantity(quantity);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 1,
        boxShadow: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 10,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product?.image}
        alt={product?.name}
        sx={{
          height: 200,
          objectFit: "cover",
        }}
      />

      <CardContent>
        <div className="flex">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product?.name}
          </Typography>
        </div>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 0.5 }}
        >
          {product?.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // marginTop: 1,
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            ₹ {new Intl.NumberFormat("en-IN").format(product?.price)}
          </Typography>

          <TextField
            type="number"
            value={isAdded ? isAdded?.quantity : quantity}
            onChange={quantityChangeHandler}
            variant="outlined"
            size="small"
            sx={{ width: 61, marginRight: 1, marginTop: "15px" }}
            disabled={isAdded || product?.stock <= 0}
          />
        </Box>
        <div className="text-sm">
          {product?.stock <= 0 ? (
            <div className="text-red-500">Out of Stock</div>
          ) : (
            `${product?.stock} in stock`
          )}
        </div>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => onAddToCart(product?._id, quantity)}
          disabled={isAdded || product?.stock <= 0}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
