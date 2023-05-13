"use server";
import { prisma } from "@/lib/prisma";
import z, { ZodFormattedError } from "zod";
import { userSchema } from "@/schema/todo.schema";

type Result =
  | { success: true; message: string }
  | {
      success: false;
      error: string | ZodFormattedError<{ name: string; score: number }>;
    };

export const createTodo = async (formData: FormData): Promise<Result> => {
  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    score: formData.get("score"),
  });

  if (parsed.success) {
    try {
      await prisma.todo.create({
        data: parsed.data,
      });
      return {
        success: true,
        message: "Todo created",
      };
    } catch (e) {
      return {
        success: false,
        error: "Failed to create todo",
      };
    }
  } else {
    return {
      success: false,
      error: parsed.error.format(),
    };
  }
};
