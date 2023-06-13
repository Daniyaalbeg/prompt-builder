import "server-only";
import { getDB } from "@/db";
import { aiModel } from "@/db/schema";
import { cache } from "react";

export const getAiModels = cache(async () => {
  return await getDB().select().from(aiModel);
});
