import { createFileRoute } from "@tanstack/react-router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UserListSection from "../../features/user/sections/UserListSection";

export const Route = createFileRoute("/_app/")({
  component: () => {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="pageTitle" gutterBottom>
          Users
        </Typography>
        <UserListSection />
      </Container>
    );
  },
});
