"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/schema/todo.schema";
import { ZodFormattedError } from "zod";

type Result =
  | { success: true; message: string }
  | {
      success: false;
      error:
        | string
        | ZodFormattedError<{
            name: string;
            score: number;
            id?: string | undefined;
          }>;
    };

export async function updateTodo(formData: FormData): Promise<Result> {
  const parsed = userSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    score: formData.get("score"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.format(),
    };
  }

  try {
    await prisma.todo.update({
      where: {
        id: parsed.data.id,
      },
      data: {
        name: parsed.data.name,
        score: parsed.data.score,
      },
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Todo updated",
    };
  } catch {
    return {
      success: false,
      error: "Failed to update todo",
    };
  }
}
