import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div>
        <CircularProgress color="primary" size={60} />
        <div className="mr-4 mt-4 text-lg">Loading...</div>
      </div>
    </Box>
  );
};

export default Loading;
