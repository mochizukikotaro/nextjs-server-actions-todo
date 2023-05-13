"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Result {
  success: boolean;
  message: string;
}

export async function deleteTodo(id: string): Promise<Result> {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Todo deleted",
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete todo",
    };
  }
}
