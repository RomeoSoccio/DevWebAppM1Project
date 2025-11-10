import { createFileRoute } from "@tanstack/react-router";
import { ClientPage } from "../../client/pages/ClientPage";

export const Route = createFileRoute("/client/")({
  component: ClientPage,
});
