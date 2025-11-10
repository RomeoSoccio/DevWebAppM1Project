import { useState } from "react";
import type { CreateClientModel } from "../ClientModel";
import { Button, Input, Modal, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface CreateClientModalProps {
  onCreate: (book: CreateClientModel) => void;
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  const onClose = () => {
    setFirstName("");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
          });
          onClose();
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  );
}
