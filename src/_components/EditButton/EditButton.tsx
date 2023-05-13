"use client";
import { PencilIcon } from "@heroicons/react/24/outline";
import { updateTodo } from "./_action";
import Modal from "react-modal";
import { use, useState } from "react";
import { ZodFormattedError } from "zod";

Modal.setAppElement("#modal-root");

interface Props {
  id: string;
  name: string;
  score: number;
}
export default function EditButton({ id, name, score }: Props) {
  const [error, setError] = useState<
    | string
    | ZodFormattedError<{
        name: string;
        score: number;
        id?: string | undefined;
      }>
    | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const formAction = async (formData: FormData) => {
    const result = await updateTodo(formData);
    // TODO: toast
    if (result.success) {
      closeModal();
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <PencilIcon className="w-5 h-5 text-gray-400" onClick={openModal} />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="m-auto relative overflow-hidden rounded-lg text-left shadow-xl bg-white my-8 max-w-xl outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
      >
        <div className="p-4 border-b">
          <h3 className="text-xl font-semibold">Edit Todo</h3>
        </div>
        <div className="p-4 border-b">
          {typeof error === "string" && (
            <div className="text-red-700 pb-5">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form action={formAction} id="editForm">
            <input type="hidden" name="id" value={id} />
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 w-full"
                id="name"
                type="text"
                name="name"
                defaultValue={name}
              />
              {typeof error !== "string" && error?.name && (
                <div className="text-red-700 py-3">
                  <ul>
                    {error.name._errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="score"
              >
                Score
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 w-full"
                id="score"
                type="number"
                name="score"
                defaultValue={score}
              />
              {typeof error !== "string" && error?.score && (
                <div className="text-red-700 py-3">
                  <ul>
                    {error.score._errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="flex items-center p-6 space-x-2">
          <button
            className="text-blue-700 border border-blue-700 px-5 py-2 rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="editForm"
            className="text-white bg-blue-700 px-5 py-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
}
