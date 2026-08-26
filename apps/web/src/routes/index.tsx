import { createFileRoute } from "@tanstack/react-router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const Route = createFileRoute("/")({
  component: UserListPage,
});

function UserListPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
    </Container>
  );
}
