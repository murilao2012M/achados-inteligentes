import { redirect } from "next/navigation";
import { getAdminSessionUser } from "@/utils/content";

export async function requireAdminUser() {
  const user = await getAdminSessionUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
