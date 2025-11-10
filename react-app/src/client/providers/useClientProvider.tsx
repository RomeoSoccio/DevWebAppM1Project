import { useState } from "react";
import type {
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from "../ClientModel";
import axios from "axios";

export const useClientProvider = () => {
  const [client, setClient] = useState<ClientModel[]>([]);

  const loadClient = () => {
    axios
      .get("http://localhost:3000/clients")
      .then((data) => {
        setClient(data.data.data);
      })
      .catch((err) => console.error(err));
  };

  const createClient = (client: CreateClientModel) => {
    axios
      .post("http://localhost:3000/clients", client)
      .then(() => {
        loadClient();
      })
      .catch((err) => console.error(err));
  };

  const updateClient = (id: string, input: UpdateClientModel) => {
    axios
      .patch(`http://localhost:3000/clients/${id}`, input)
      .then(() => {
        loadClient();
      })
      .catch((err) => console.error(err));
  };

  const deleteClient = (id: string) => {
    axios
      .delete(`http://localhost:3000/clients/${id}`)
      .then(() => {
        loadClient();
      })
      .catch((err) => console.error(err));
  };

  return { client, loadClient, createClient, updateClient, deleteClient };
};
