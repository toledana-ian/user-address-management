import { Link } from "@tanstack/react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
        py: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "brand.tint",
        }}
      >
        <SentimentDissatisfiedOutlinedIcon
          sx={{ fontSize: 72, color: "brand.link" }}
        />
      </Box>
      <Typography variant="pageTitle">User not found</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 360 }}>
        We couldn&apos;t find a user with that id. They may have been removed or
        the link is incorrect.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<HomeOutlinedIcon />}
        sx={{ mt: 1 }}
      >
        Return home
      </Button>
    </Box>
  );
};

export default UserNotFound;
