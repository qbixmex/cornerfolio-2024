"use server";

import { revalidatePath } from "next/cache";

export default async function refreshPage() {
	revalidatePath("admin/portfolio-management");
}
