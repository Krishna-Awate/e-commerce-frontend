import React, { useState } from "react";
import { TableCell, TableRow, IconButton, TextField, Box } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartItem = ({ product, onUpdateQuantity, onRemoveCartItems }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  // Handle increase and decrease in quantity by one item
  const handleQuantityChange = (change) => {
    if (quantity + change >= 1 && quantity + change <= product.stock) {
      setQuantity(quantity + change);
      onUpdateQuantity(product.productId, quantity + change);
    }
  };

  // Handle quantity change by input field
  const handleDirectQuantityChange = (event) => {
    let value = +event.target.value;
    const quantity = Math.max(1, Math.min(product?.stock, value));
    setQuantity(quantity);
    onUpdateQuantity(product.productId, quantity);
  };

  // Calculate total price based on quantity
  const totalPrice = product.price * quantity;

  return (
    <TableRow>
      <TableCell sx={{ width: 100 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity === 1}
          >
            <Remove />
          </IconButton>
          <TextField
            type="number"
            value={quantity}
            onChange={handleDirectQuantityChange}
            sx={{ width: 65, textAlign: "center" }}
            variant="outlined"
            size="small"
          />
          <IconButton
            onClick={() => handleQuantityChange(1)}
            disabled={quantity === product.stock}
          >
            <Add />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        {new Intl.NumberFormat("en-IN").format(product?.price?.toFixed(0))}
      </TableCell>
      <TableCell>
        {new Intl.NumberFormat("en-IN").format(totalPrice?.toFixed(0))}
      </TableCell>
      <TableCell>
        <IconButton
          color="secondary"
          onClick={() => onRemoveCartItems(product.productId)}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
