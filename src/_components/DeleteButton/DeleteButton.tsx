"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteTodo } from "./_action";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#modal-root");

interface Props {
  id: string;
}
export default function DeleteButton({ id }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };
  const openModal = () => setIsOpen(true);

  return (
    <>
      <TrashIcon className="w-5 h-5 text-gray-400" onClick={openModal} />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="m-auto relative overflow-hidden rounded-lg text-left shadow-xl bg-white my-8 max-w-xl outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
      >
        <div className="p-4 border-b">
          <h3 className="text-xl font-semibold">Confirm Delete</h3>
        </div>
        {error && (
          <div className="text-red-700 px-6 pt-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex items-center p-6 space-x-2">
          <button
            className="text-blue-700 border border-blue-700 px-5 py-2 rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="text-white bg-red-700 px-5 py-2 rounded-lg"
            onClick={async () => {
              const result = await deleteTodo(id);
              // TODO: toast
              if (result.success) {
                // alert(result.message);
              } else {
                setError(result.message);
              }
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
