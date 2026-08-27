import { createFileRoute } from "@tanstack/react-router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const Route = createFileRoute("/_app/user/$id")({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { id } = Route.useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="pageTitle" gutterBottom>
        User {id}
      </Typography>
    </Container>
  );
}
