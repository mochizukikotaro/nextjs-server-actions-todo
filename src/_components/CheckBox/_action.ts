"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleDone(id: string, currentDone: boolean) {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        done: !currentDone,
      },
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Done toggled",
    };
  } catch {
    return {
      success: false,
      message: "Failed to toggle done",
    };
  }
}
