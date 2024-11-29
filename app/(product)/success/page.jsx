"use client";
import { Box, Typography, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        // height: "100vh",
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
        <Typography variant="h4" color="text.primary" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Your payment was processed successfully. Thank you for your purchase!
        </Typography>
      </Box>
      <div className="hover:cursor-pointer text-blue-800 underline">
        <Link href="/"> Click here for more shopping</Link>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
