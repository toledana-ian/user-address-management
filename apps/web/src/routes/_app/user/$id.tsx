import { createFileRoute } from "@tanstack/react-router";
import Container from "@mui/material/Container";
import UserDetailSection from "../../../features/user/sections/UserDetailSection";

export const Route = createFileRoute("/_app/user/$id")({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { id } = Route.useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserDetailSection key={id} id={id} />
    </Container>
  );
}
