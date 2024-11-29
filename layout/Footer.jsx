"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: "70px",
        width: "100%",
      }}
    >
      <div className="p-6">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              SHOPEASY
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all things trendy and affordable. Find the
              best products in electronics, fashion, home decor, and more!
            </Typography>
            <Box>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Facebook />
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Twitter />
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Home
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Shop
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              About Us
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Contact Us
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              FAQ
            </Link>
          </Grid>

          {/* Customer Service Links */}
          <Grid size={{ xs: 12, sm: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Customer Service
            </Typography>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Shipping & Returns
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
            >
              Track Order
            </Link>
          </Grid>
        </Grid>
      </div>
      <Divider sx={{ my: 4, borderColor: "#444" }} />
      {/* Footer Bottom Section */}
      <Box
        textAlign="center"
        sx={{ padding: "16px 0", backgroundColor: "#333" }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} SHOPEASY. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
