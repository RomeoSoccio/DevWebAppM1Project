import React, { useState } from "react";
import type { BookModel, UpdateBookModel } from "../BookModel";
import { Button, Col, Row, Modal } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "@tanstack/react-router";

interface BookListItemProps {
  book: BookModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateBookModel) => void;
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const showDeleteConfirm = () => {
    console.log("BookListItem: showDeleteConfirm called for id=", book.id);
    // Ant Design v5 currently shows a compatibility warning for React 19.
    // If running React >= 19, some Antd components that rely on internal APIs
    // (portals, lifecycle hooks) may not render correctly. Use a safe native
    // fallback so the delete UX always works.
    try {
      const reactVersion = (React?.version || "")
        .split(".")
        .map((s) => parseInt(s, 10) || 0);
      const reactMajor = reactVersion[0] || 0;
      if (reactMajor >= 19) {
        console.warn(
          "Antd v5 may be incompatible with React >=19 — using native confirm fallback",
        );
        if (window.confirm(`Supprimer le livre "${book.title}" ?`)) {
          console.log("BookListItem: native confirm accepted for id=", book.id);
          onDelete(book.id);
        }
        return;
      }

      // For React <=18, try Antd Modal.confirm as intended.
      Modal.confirm({
        title: "Supprimer le livre",
        content: `Voulez-vous vraiment supprimer "${book.title}" ?`,
        okText: "Supprimer",
        okType: "danger",
        cancelText: "Annuler",
        onOk: () => {
          console.log("BookListItem: confirmed delete for id=", book.id);
          onDelete(book.id);
        },
      });
    } catch (err) {
      console.error(
        "BookListItem: Modal.confirm error, falling back to native confirm",
        err,
      );
      if (window.confirm(`Supprimer le livre "${book.title}" ?`)) {
        onDelete(book.id);
      }
    }
  };
  const [title, setTitle] = useState(book.title);
  const [isEditing, setIsEditing] = useState(false);

  const onCancelEdit = () => {
    setIsEditing(false);
    setTitle(book.title);
  };

  const onValidateEdit = () => {
    onUpdate(book.id, { title });
    setIsEditing(false);
  };

  return (
    <Row
      style={{
        width: "100%",
        height: "50px",
        borderRadius: "10px",
        backgroundColor: "#EEEEEE",
        margin: "1rem 0",
        padding: ".25rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Col span={12} style={{ margin: "auto 0" }}>
        {isEditing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <Link
            to={`/books/$bookId`}
            params={{ bookId: book.id }}
            style={{
              margin: "auto 0",
              textAlign: "left",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{book.title}</span> -{" "}
            {book.yearPublished}
          </Link>
        )}
      </Col>
      <Col span={9} style={{ margin: "auto 0" }}>
        by <span style={{ fontWeight: "bold" }}>{book.author.firstName}</span>{" "}
        <span style={{ fontWeight: "bold" }}>{book.author.lastName}</span>
      </Col>
      <Col
        span={3}
        style={{
          alignItems: "right",
          display: "flex",
          gap: ".25rem",
          margin: "auto 0",
        }}
      >
        {isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
        )}
        <Button type="primary" danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  );
}
