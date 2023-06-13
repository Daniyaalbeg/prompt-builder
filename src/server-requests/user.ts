import "server-only";
import { auth } from "@/auth/lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUser = cache(async () => {
  const authRequest = auth.handleRequest({ cookies });
  const { user } = await authRequest.validateUser();
  if (!user) redirect("/sign-in");

  return user;
});
