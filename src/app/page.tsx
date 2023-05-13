import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/_components/DeleteButton/DeleteButton";
import EditButton from "@/_components/EditButton/EditButton";
import CheckBox from "@/_components/CheckBox/CheckBox";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="mx-auto max-w-3xl px-8 py-12">
      <h1 className="text-xl py-8">Todo App</h1>
      <Link href="/new">
        <button className="text-white bg-blue-700 text-sm px-5 py-2 rounded-lg">
          + Add Todo
        </button>
      </Link>
      <div className="py-8">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id} className="bg-white border-b">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <CheckBox id={todo.id} name={todo.name} done={todo.done} />
                  </td>
                  <td className="px-6 py-4">{todo.score}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <DeleteButton id={todo.id} />
                      <EditButton
                        id={todo.id}
                        name={todo.name}
                        score={todo.score}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
