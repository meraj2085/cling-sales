import { Modal } from "antd";
import React from "react";

const CSModal = ({
  isOpen,
  closeModal,
  title,
  children,
  handleOk,
  showCancelButton = true,
  showOkButton = true,
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={closeModal}
      cancelButtonProps={{
        style: { display: showCancelButton ? "inline" : "none" },
      }}
      okButtonProps={{
        style: {
          background: "#6E97D4",
          display: showOkButton ? "inline" : "none",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default CSModal;
