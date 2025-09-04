import React from "react";
import { Modal, Spinner } from "../components/ui/";
// import { Dialog } from "@material-tailwind/react";

 
export default function DialogDefault() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <>
      <Modal
        open={open}
        title="Konfirmasi"
        variant="error"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="flex items-center gap-3">
          <Spinner size={32} className="" />
          <span>Apakah kamu yakin?</span>
        </div>
      </Modal>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setOpen(true)}
      >
        Buka Modal
      </button>

    </>
  );
}