import { Skeleton, Space, Typography } from "antd";
import { useClientDetailsProvider } from "../providers/useClientDetailsProvider";
import { useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Route as clientRoute } from "../../routes/clients";

interface ClientDetailsProps {
  id: string;
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, client, loadClient } = useClientDetailsProvider(id);

  useEffect(() => {
    loadClient();
  }, [id]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Space direction="vertical" style={{ textAlign: "left", width: "95%" }}>
      <Link to={clientRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <Typography.Title level={1}>{client?.firstName}</Typography.Title>
    </Space>
  );
};
