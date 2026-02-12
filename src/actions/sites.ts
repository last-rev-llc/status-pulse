"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSiteSchema } from "@/lib/validations/site";

export async function createSite(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = createSiteSchema.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // TODO: Get workspace from user membership
  // For now, use first workspace
  const membership = await db.membership.findFirst({
    where: { userId: session.user.id },
  });

  if (!membership) {
    return { error: { name: ["No workspace found. Please create one first."] } };
  }

  await db.site.create({
    data: {
      ...parsed.data,
      workspaceId: membership.workspaceId,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteSite(siteId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await db.site.delete({ where: { id: siteId } });
  revalidatePath("/dashboard");
  return { success: true };
}
