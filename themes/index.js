"use client";
import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
    },
    error: {
      main: "#f44336",
      light: "#f6645e",
    },
    grey: {
      300: "#e0e0e0",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10.5px 14px 10.5px 12px",
        },
        notchedOutline: {
          borderColor: "#e0e0e0",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#63a4ff",
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 2px ${alpha("#1976d2", 0.2)}`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid #63a4ff`,
            },
          },
          "&.Mui-error": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f6645e",
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 2px ${alpha("#f44336", 0.2)}`,
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid #f6645e`,
              },
            },
          },
        },
        inputSizeSmall: {
          padding: "7.5px 8px 7.5px 12px",
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },
  },
});

export default theme;
