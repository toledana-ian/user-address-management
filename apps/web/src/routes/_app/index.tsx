import { createFileRoute } from "@tanstack/react-router";
import Container from "@mui/material/Container";
import UserListSection from "../../features/user/sections/UserListSection";

export const Route = createFileRoute("/_app/")({
  component: () => {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <UserListSection />
      </Container>
    );
  },
});
