"use client";
import { redirect } from "next/navigation";
import { createTodo } from "./_action";
import { useState } from "react";
import { ZodEffects, ZodError, ZodFormattedError, z } from "zod";

export default function NewTodo() {
  const [error, setError] = useState<
    string | ZodFormattedError<{ name: string; score: number }> | null
  >(null);
  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <h1 className="text-xl py-8">New Todo</h1>
      {typeof error === "string" && (
        <div className="text-red-700 pb-5">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form
        action={async (formData) => {
          const result = await createTodo(formData);
          if (result.success) {
            redirect("/");
          } else {
            setError(result.error);
          }
        }}
      >
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
        <button
          className="text-white bg-blue-700 px-5 py-2 rounded-lg"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
