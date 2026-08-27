import { createFileRoute } from "@tanstack/react-router";
import DefaultLayout from "../../app/layouts/DefaultLayout";

export const Route = createFileRoute("/_app")({
  component: DefaultLayout,
});
