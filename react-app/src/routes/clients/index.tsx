import { createFileRoute } from "@tanstack/react-router";
import { ClientPage } from "../../clients/pages/ClientPage";

export const Route = createFileRoute("/clients/")({
  component: ClientPage,
});
