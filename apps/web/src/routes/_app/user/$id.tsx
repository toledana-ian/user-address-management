import { createFileRoute, Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const Route = createFileRoute("/_app/user/$id")({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { id } = Route.useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to users
      </Button>
      <Typography variant="pageTitle" gutterBottom>
        User {id}
      </Typography>
    </Container>
  );
}
